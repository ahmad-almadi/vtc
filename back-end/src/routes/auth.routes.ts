import { Router } from 'express';
import { login, logout, changePassword, verifySession } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/logout', requireAuth, logout);
router.put('/password', requireAuth, changePassword);
router.get('/verify', requireAuth, verifySession);

export default router;
