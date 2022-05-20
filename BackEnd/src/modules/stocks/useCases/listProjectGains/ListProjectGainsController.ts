import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProjectGainsUseCase } from "./ListProjectGainsUseCase";

class ListProjectGainsController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { stock_name } = request.params;
        const { purchasedAmount, purchasedAt } = request.query;

        const listProjectGainsUseCase = container.resolve(ListProjectGainsUseCase);

        const historic = await listProjectGainsUseCase.execute({
            stock_name: stock_name,
            purchasedAmount: purchasedAmount as unknown as number, 
            purchasedAt: purchasedAt as string
        })

        return response.json(historic);
    }
}

export { ListProjectGainsController };