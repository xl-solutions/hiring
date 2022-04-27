import Router from 'express';
import homeRoute from './HomeRoute.js';

const router = Router();

router.use('/', homeRoute);

export default router;
