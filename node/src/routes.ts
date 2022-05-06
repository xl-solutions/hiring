import { Router } from 'express';

import { corretoraRouter } from './corretora/routes/corretora.routes';

export const routes = Router();

routes.use('/stocks', corretoraRouter);
