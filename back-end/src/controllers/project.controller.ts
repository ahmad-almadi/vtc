import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { defaultProjectSliderSettings } from '../lib/project-seed.js';
import { slugifyProjectTitle } from '../lib/project-utils.js';

type NormalizedProjectInput = {
  title: string;
  description: string;
  thumbnailUrl: string;
  liveUrl: string | null;
  githubUrl: string | null;
  techStack: string[];
  displayOrder: number;
  isPublished: boolean;
};

type NormalizedProjectSliderSettings = {
  autoplayDelayMs: number;
  pauseOnHover: boolean;
};

const sliderSettingsKey = defaultProjectSliderSettings.key;

const normalizeText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const normalizeOptionalText = (value: unknown) => {
  const normalized = normalizeText(value);
  return normalized || null;
};

const normalizeTechStack = (value: unknown) => {
  if (Array.isArray(value)) {
    return value
      .map((entry) => normalizeText(entry))
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeBoolean = (value: unknown, fallbackValue = true) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const lowerValue = value.trim().toLowerCase();

    if (lowerValue === 'true') {
      return true;
    }

    if (lowerValue === 'false') {
      return false;
    }
  }

  return fallbackValue;
};

const normalizeDisplayOrder = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.trunc(value);
  }

  const parsedValue = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const normalizeProjectSliderSettings = (body: Record<string, unknown>) => {
  const autoplayDelayMs = Number.parseInt(String(body.autoplayDelayMs ?? ''), 10);
  const normalizedDelay =
    Number.isFinite(autoplayDelayMs) && autoplayDelayMs >= 1000 && autoplayDelayMs <= 20000
      ? autoplayDelayMs
      : Number.NaN;

  if (!Number.isFinite(normalizedDelay)) {
    return { error: 'Autoplay delay must be between 1000ms and 20000ms' };
  }

  return {
    autoplayDelayMs: normalizedDelay,
    pauseOnHover: normalizeBoolean(body.pauseOnHover, defaultProjectSliderSettings.pauseOnHover),
  } satisfies NormalizedProjectSliderSettings;
};

const normalizeProjectInput = (body: Record<string, unknown>, fallbackPublished = true) => {
  const title = normalizeText(body.title);
  const description = normalizeText(body.description);
  const thumbnailUrl = normalizeText(body.thumbnailUrl);

  if (!title || !description || !thumbnailUrl) {
    return { error: 'Title, description, and thumbnail are required' };
  }

  return {
    title,
    description,
    thumbnailUrl,
    liveUrl: normalizeOptionalText(body.liveUrl),
    githubUrl: normalizeOptionalText(body.githubUrl),
    techStack: normalizeTechStack(body.techStack),
    displayOrder: normalizeDisplayOrder(body.displayOrder),
    isPublished: normalizeBoolean(body.isPublished, fallbackPublished),
  } satisfies NormalizedProjectInput;
};

const buildUniqueSlug = async (title: string, excludeId?: string) => {
  const baseSlug = slugifyProjectTitle(title);
  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const existingProject = await prisma.project.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existingProject || existingProject.id === excludeId) {
      return slug;
    }

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
};

const getOrCreateProjectSliderSettings = async () => {
  return prisma.projectSliderSettings.upsert({
    where: { key: sliderSettingsKey },
    update: {},
    create: defaultProjectSliderSettings,
  });
};

const projectOrderBy = [{ displayOrder: 'asc' as const }, { updatedAt: 'desc' as const }];

export const getPublishedProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: projectOrderBy,
    });

    res.json(projects);
  } catch (error) {
    console.error('Failed to fetch published projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getAdminProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: projectOrderBy,
    });

    res.json(projects);
  } catch (error) {
    console.error('Failed to fetch admin projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProjectSliderSettings = async (_req: Request, res: Response) => {
  try {
    const projectSliderSettings = await getOrCreateProjectSliderSettings();
    res.json(projectSliderSettings);
  } catch (error) {
    console.error('Failed to fetch project slider settings:', error);
    res.status(500).json({ error: 'Failed to fetch slider settings' });
  }
};

export const updateProjectSliderSettings = async (req: Request, res: Response) => {
  try {
    const normalizedSettings = normalizeProjectSliderSettings(req.body);

    if ('error' in normalizedSettings) {
      return res.status(400).json({ error: normalizedSettings.error });
    }

    const projectSliderSettings = await prisma.projectSliderSettings.upsert({
      where: { key: sliderSettingsKey },
      update: normalizedSettings,
      create: {
        key: sliderSettingsKey,
        ...normalizedSettings,
      },
    });

    return res.json(projectSliderSettings);
  } catch (error) {
    console.error('Failed to update project slider settings:', error);
    return res.status(500).json({ error: 'Failed to update slider settings' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const normalizedInput = normalizeProjectInput(req.body);

    if ('error' in normalizedInput) {
      return res.status(400).json({ error: normalizedInput.error });
    }

    const slug = await buildUniqueSlug(normalizedInput.title);

    const project = await prisma.project.create({
      data: {
        ...normalizedInput,
        slug,
      },
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error('Failed to create project:', error);
    return res.status(500).json({ error: 'Failed to create project' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const existingProject = await prisma.project.findUnique({
      where: { id: req.params.id as string },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const normalizedInput = normalizeProjectInput(req.body, existingProject.isPublished);

    if ('error' in normalizedInput) {
      return res.status(400).json({ error: normalizedInput.error });
    }

    const slug =
      normalizedInput.title === existingProject.title
        ? existingProject.slug
        : await buildUniqueSlug(normalizedInput.title, existingProject.id);

    const project = await prisma.project.update({
      where: { id: existingProject.id },
      data: {
        ...normalizedInput,
        slug,
      },
    });

    return res.json(project);
  } catch (error) {
    console.error('Failed to update project:', error);
    return res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const existingProject = await prisma.project.findUnique({
      where: { id: req.params.id as string },
      select: { id: true },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await prisma.project.delete({
      where: { id: existingProject.id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error('Failed to delete project:', error);
    return res.status(500).json({ error: 'Failed to delete project' });
  }
};
