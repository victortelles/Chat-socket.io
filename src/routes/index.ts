import { Router } from 'express';
import { renderIndex } from '../controllers/index.controller';

const router = Router();

//ruta main
router.get('/', renderIndex);


export default router;
