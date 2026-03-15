import 'dotenv/config';
import { defaultProjects } from '../src/lib/default-projects.js';
import { prisma } from '../src/lib/prisma.js';
import { defaultProjectSliderSettings } from '../src/lib/project-seed.js';
import { slugifyProjectTitle } from '../src/lib/project-utils.js';

const seedProjects = async () => {
  await prisma.projectSliderSettings.upsert({
    where: { key: defaultProjectSliderSettings.key },
    update: {
      autoplayDelayMs: defaultProjectSliderSettings.autoplayDelayMs,
      pauseOnHover: defaultProjectSliderSettings.pauseOnHover,
    },
    create: defaultProjectSliderSettings,
  });

  for (const project of defaultProjects) {
    const slug = slugifyProjectTitle(project.title);

    await prisma.project.upsert({
      where: { slug },
      update: project,
      create: {
        ...project,
        slug,
      },
    });
  }
};

seedProjects()
  .then(async () => {
    console.log(`Seeded ${defaultProjects.length} projects`);
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Project seed failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
