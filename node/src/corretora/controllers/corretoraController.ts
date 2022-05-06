import { Request, Response } from 'express';

import { CorretoraService } from '../services/CorretoraService';

const corretoraService = new CorretoraService();

export class CorretoraController {
	async getCotacaoRecente(req: Request, res: Response) {
		const { stock_name } = req.params;

		const cotacoesRecentes = await corretoraService.getCotacaoRecenteBySymbol(
			stock_name
		);

		return res.json(cotacoesRecentes);
	}
}
