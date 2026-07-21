import { Router } from 'express';
import { getSigns, getPlanets, getHouses } from '../controllers/dictionaryController';

const router = Router();

router.get('/signs', getSigns);
router.get('/planets', getPlanets);
router.get('/houses', getHouses);

export default router;
