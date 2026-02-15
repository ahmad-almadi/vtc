import { Router } from 'express';
import { createContactRequest, getAllContacts } from '../controllers/contact.controller.js';

const router = Router();

router.post('/', createContactRequest);
router.get('/', getAllContacts);

export default router;
