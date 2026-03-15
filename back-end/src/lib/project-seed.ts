import bcrypt from 'bcryptjs';
import { defaultProjects } from './default-projects.js';
import { prisma } from './prisma.js';
import { slugifyProjectTitle } from './project-utils.js';

export const defaultProjectSliderSettings = {
  key: 'default',
  autoplayDelayMs: 3000,
  pauseOnHover: true,
};

const DEFAULT_ADMIN_PASSWORD = 'saleh2005';

const ensureAdminPassword = async () => {
  const existing = await prisma.adminPassword.findUnique({ where: { key: 'admin' } });
  if (existing) return;

  const hash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 12);
  await prisma.adminPassword.create({ data: { key: 'admin', hash } });
  console.log('Seeded default admin password');
};

export const ensureProjectSeedData = async () => {
  await ensureAdminPassword();

  await prisma.projectSliderSettings.upsert({
    where: { key: defaultProjectSliderSettings.key },
    update: {},
    create: defaultProjectSliderSettings,
  });

  const projectCount = await prisma.project.count();

  if (projectCount > 0) {
    return;
  }

  await prisma.project.createMany({
    data: defaultProjects.map((project) => ({
      ...project,
      slug: slugifyProjectTitle(project.title),
    })),
  });

  console.log(`Seeded ${defaultProjects.length} default projects`);
};
