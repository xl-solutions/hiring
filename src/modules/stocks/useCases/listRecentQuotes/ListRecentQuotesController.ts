import { Request, Response } from "express";

import { ListRecentQuotesUseCase } from "./ListRecentQuotesUseCase";

const listRecentQuotesUseCase = new ListRecentQuotesUseCase();

class ListRecentQuotesController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { stock_name } = request.params;

        const recentQuotes = await listRecentQuotesUseCase.execute({stock_name});

        return response.json(recentQuotes);
    }
}

export { ListRecentQuotesController };