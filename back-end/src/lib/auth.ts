import { randomUUID } from 'crypto';

const activeSessions = new Map<string, number>();

const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

export const createSession = () => {
  const token = randomUUID();
  activeSessions.set(token, Date.now() + SESSION_TTL_MS);
  return token;
};

export const isValidSession = (token: string | undefined) => {
  if (!token) return false;
  const expiry = activeSessions.get(token);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    activeSessions.delete(token);
    return false;
  }
  return true;
};

export const destroySession = (token: string) => {
  activeSessions.delete(token);
};
