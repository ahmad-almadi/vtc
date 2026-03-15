import { apiRequest } from './api';

export const listProjects = async () => apiRequest('/projects');
export const listAdminProjects = async () => apiRequest('/projects/admin');
export const getProjectSliderSettings = async () => apiRequest('/projects/settings');
export const createProject = async (payload) =>
  apiRequest('/projects', { method: 'POST', body: JSON.stringify(payload) });
export const updateProject = async (projectId, payload) =>
  apiRequest(`/projects/${projectId}`, { method: 'PUT', body: JSON.stringify(payload) });
export const updateProjectSliderSettings = async (payload) =>
  apiRequest('/projects/settings', { method: 'PUT', body: JSON.stringify(payload) });
export const deleteProject = async (projectId) =>
  apiRequest(`/projects/${projectId}`, { method: 'DELETE' });
