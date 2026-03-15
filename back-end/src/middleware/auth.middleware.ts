import { Request, Response, NextFunction } from 'express';
import { isValidSession } from '../lib/auth.js';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;

  if (!isValidSession(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};
