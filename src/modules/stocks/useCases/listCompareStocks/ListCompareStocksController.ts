import { Request, Response } from "express";

import { ListCompareStocksUseCase } from "./ListCompareStocksUseCase";

const listCompareStocksUseCase = new ListCompareStocksUseCase();

class ListCompareStocksController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { stock_name } = request.params;
        const { stocks } = request.body;

        const compare = await listCompareStocksUseCase.execute({
            stock_name,
            stocks
        })

        return response.json(compare);
    }
}

export { ListCompareStocksController };