import { Router } from 'express';
import { calculateNatalChart } from '../controllers/chartController';

const router = Router();

router.post('/calcular-carta', calculateNatalChart);

export default router;
