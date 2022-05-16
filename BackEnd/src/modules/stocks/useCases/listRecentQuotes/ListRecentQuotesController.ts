import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRecentQuotesUseCase } from "./ListRecentQuotesUseCase";

class ListRecentQuotesController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { stock_name } = request.params;

        const listRecentQuotesUseCase = container.resolve(ListRecentQuotesUseCase);

        const recentQuotes = await listRecentQuotesUseCase.execute({stock_name});

        return response.json(recentQuotes);
    }
}

export { ListRecentQuotesController };