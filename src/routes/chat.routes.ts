// src/routes/chat.routes.ts
import { Router } from 'express';
import { getChatRoom } from '../controllers/chat.controller';
import { validateUsername } from '../middlewares/auth.middleware';

const router = Router();

//Sin middleware
router.get('/:id', getChatRoom);

//con middleware
//router.get('/:id', validateUsername, getChatRoom);

export default router;
