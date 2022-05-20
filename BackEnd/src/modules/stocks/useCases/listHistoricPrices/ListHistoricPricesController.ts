import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListHistoricPricesUseCase } from "./ListHistoricPricesUseCase";

class ListHistoricPricesController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { stock_name } = request.params;
        const { from, to } = request.query;

        const listHistoricPricesUseCase = container.resolve(ListHistoricPricesUseCase);

        const historic = await listHistoricPricesUseCase.execute({
            stock_name: stock_name,
            from: from as string, 
            to: to as string
        })

        return response.json(historic);
    }
}

export { ListHistoricPricesController };