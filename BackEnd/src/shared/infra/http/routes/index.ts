import { Router } from "express";

import { stocksRouter } from "./stocks.routes";

const router = Router();

router.use("/stocks", stocksRouter);

export { router };