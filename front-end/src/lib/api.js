const deployedApiBaseUrl = 'https://vtc-back-end-production.up.railway.app/api';
const localApiBaseUrl = 'http://localhost:5000/api';

const isLocalHost =
  typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || (isLocalHost ? localApiBaseUrl : deployedApiBaseUrl);

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.error || data?.message || `Request failed with ${response.status}`);
  }

  return data;
};
