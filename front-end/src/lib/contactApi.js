import { apiRequest } from './api';

export const listContacts = async () => apiRequest('/contact');
