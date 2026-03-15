import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getAdminProjects,
  getPublishedProjects,
  getProjectSliderSettings,
  updateProject,
  updateProjectSliderSettings,
} from '../controllers/project.controller.js';

const router = Router();

router.get('/', getPublishedProjects);
router.get('/admin', getAdminProjects);
router.get('/settings', getProjectSliderSettings);
router.post('/', createProject);
router.put('/settings', updateProjectSliderSettings);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
