import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCompareStocksUseCase } from "./ListCompareStocksUseCase";

class ListCompareStocksController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { stock_name } = request.params;
        const { stocks } = request.body;

        const listCompareStocksUseCase = container.resolve(ListCompareStocksUseCase);

        const compare = await listCompareStocksUseCase.execute({
            stock_name,
            stocks
        })

        return response.json(compare);
    }
}

export { ListCompareStocksController };