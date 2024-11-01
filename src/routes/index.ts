import { Router } from 'express';
import { renderIndex } from '../controllers/index.controller';
import chatRoutes from './chat.routes';

const router = Router();

//ruta main
router.get('/', renderIndex);

//Ruta para las salas
router.use('/chat', chatRoutes);


export default router;
