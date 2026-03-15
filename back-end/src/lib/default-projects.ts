export type DefaultProject = {
  title: string;
  description: string;
  thumbnailUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  displayOrder: number;
  isPublished: boolean;
};

export const defaultProjects: DefaultProject[] = [
  {
    title: 'Glamora Commerce',
    description:
      'An immersive e-commerce experience that combines premium visuals with fluid shopping interactions.',
    thumbnailUrl: '/images/e-commerce-proj.webp',
    liveUrl: 'https://glamora.up.railway.app',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    displayOrder: 1,
    isPublished: true,
  },
  {
    title: 'SaaS Command Center',
    description:
      'A clean SaaS dashboard experience that balances speed, clarity, and polished product motion.',
    thumbnailUrl: '/images/saas.webp',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/vtc/dashboard',
    techStack: ['React', 'TypeScript', 'Express'],
    displayOrder: 2,
    isPublished: true,
  },
  {
    title: 'Flow of Purity',
    description:
      'A refined wellness site that mixes soft visual storytelling with smooth, continuous transitions.',
    thumbnailUrl: '/images/flow-proj.webp',
    liveUrl: 'https://flowofpurity.com',
    techStack: ['HTML', 'PHP', 'Bootstrap'],
    displayOrder: 3,
    isPublished: true,
  },
  {
    title: 'Doctor Fral',
    description:
      'A modern medical presentation site designed around trust, clarity, and responsive interactions.',
    thumbnailUrl: '/images/doctor-proj.webp',
    liveUrl: 'https://doctor-fral.vercel.app',
    techStack: ['Next.js', 'Three.js', 'Tailwind'],
    displayOrder: 4,
    isPublished: true,
  },
  {
    title: 'Beauty Lounge',
    description:
      'A vibrant salon brand site with energetic visuals and a soft, premium browsing rhythm.',
    thumbnailUrl: '/images/beauty-lounge-proj.webp',
    liveUrl: 'https://beatuty-lounge-production.up.railway.app',
    techStack: ['Next.js', 'Three.js', 'Tailwind'],
    displayOrder: 5,
    isPublished: true,
  },
  {
    title: 'Dental One',
    description:
      'A healthcare landing experience focused on confidence, comfort, and fast service discovery.',
    thumbnailUrl: '/images/dental.webp',
    liveUrl: 'https://dental-one-rho.vercel.app',
    techStack: ['Next.js', 'Three.js', 'Tailwind'],
    displayOrder: 6,
    isPublished: true,
  },
];
