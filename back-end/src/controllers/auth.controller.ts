import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { createSession, destroySession } from '../lib/auth.js';

const ADMIN_KEY = 'admin';

export const login = async (req: Request, res: Response) => {
  try {
    const password = typeof req.body.password === 'string' ? req.body.password : '';

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const admin = await prisma.adminPassword.findUnique({ where: { key: ADMIN_KEY } });

    if (!admin) {
      return res.status(500).json({ error: 'Admin password not configured' });
    }

    const valid = await bcrypt.compare(password, admin.hash);

    if (!valid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = createSession();
    return res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const currentPassword = typeof req.body.currentPassword === 'string' ? req.body.currentPassword : '';
    const newPassword = typeof req.body.newPassword === 'string' ? req.body.newPassword : '';

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    if (newPassword.length < 4) {
      return res.status(400).json({ error: 'New password must be at least 4 characters' });
    }

    const admin = await prisma.adminPassword.findUnique({ where: { key: ADMIN_KEY } });

    if (!admin || !(await bcrypt.compare(currentPassword, admin.hash))) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hash = await bcrypt.hash(newPassword, 12);
    await prisma.adminPassword.update({ where: { key: ADMIN_KEY }, data: { hash } });

    return res.json({ message: 'Password updated' });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ error: 'Failed to change password' });
  }
};

export const logout = async (req: Request, res: Response) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  if (token) destroySession(token);
  res.json({ message: 'Logged out' });
};

export const verifySession = async (_req: Request, res: Response) => {
  res.json({ valid: true });
};
