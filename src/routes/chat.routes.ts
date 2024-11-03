// src/routes/chat.routes.ts
import { Router } from 'express';
import { getChatRoom } from '../controllers/chat.controller';
import { validateUsername } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:id', getChatRoom);

export default router;
