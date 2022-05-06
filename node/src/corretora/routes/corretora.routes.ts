import { Router } from 'express';

import { CorretoraController } from '../controllers/corretoraController';

export const corretoraRouter = Router();

const corretoraController = new CorretoraController();

corretoraRouter.get('/:stock_name/quote', corretoraController.getCotacaoRecente);
