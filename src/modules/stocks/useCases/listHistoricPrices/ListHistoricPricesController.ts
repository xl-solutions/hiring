import { Request, Response } from "express";

import { ListHistoricPricesUseCase } from "./ListHistoricPricesUseCase";

const listHistoricPricesUseCase = new ListHistoricPricesUseCase();

class ListHistoricPricesController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { stock_name } = request.params;
        const { from, to } = request.query;

        const historic = await listHistoricPricesUseCase.execute({
            stock_name: stock_name,
            from: from as string, 
            to: to as string
        })

        return response.json(historic);
    }
}

export { ListHistoricPricesController };