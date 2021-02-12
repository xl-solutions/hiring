import { Request, Response } from "express"
import api from '../services/alphaVantageApi'

class apiError{
	
	public code
	public message

	constructor(code: number, message: string){
		this.code = code,
		this.message = message
	}
	
}

export function validatePayload(from: string, to: string, stock_name: string){
	const dateFormat = /^(\d{4})[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/

	if(stock_name === '' || !stock_name) {
		throw new Error('Insira um valor válido para o nome da ação')
	}
	if(!from || !dateFormat.test(from)) {
		throw new Error('Insira uma data válida em "from", no formato "yyyy-mm-dd"')
	}
	if(!to || !dateFormat.test(to)) {
		throw new Error('Insira uma data válida em "to", no formato "yyyy-mm-dd"')
	}
	if(new Date(from) > new Date(to)){
		throw new Error('A data de início não deve ser maior que a data de término')
	}
	const currentDate = new Date()
	if(new Date(to) > currentDate){
		throw new Error('O valor de "to" não pode ser mais recente que a data atual')
	}
}

export function validateResponse(response: any, stock_name?: string){
	if(response['Error Message']){
		throw new apiError(404, `Não foi possível encontrar dados da ação${stock_name?' '+stock_name:''}, confira os dados e tente novamente`)
	}
	if(response.Note){
		console.log(response.Note)
		throw new apiError(523, 'A API atingiu o limite de requisições por minuto, tente novamente em instantes')
	}
	if(!response){
		throw new apiError(404, 'Não foi possível encontrar o recurso buscado')
	}
}

export function fixWeekends(date: string){

	const dateDate = new Date(date)
	if(dateDate.getDay() === 6){
		dateDate.setDate(dateDate.getDate()+1)
	}else if(dateDate.getDay() === 5){
		dateDate.setDate(dateDate.getDate()-1)
	}

	const isoDate = dateDate.toISOString().split('T')[0]
	return isoDate

}

export function parseDate(dateTime:string){
	let [date, time] = dateTime.split(' ', 2)
	let [hour, minutes, seconds] = time.split(':', 3)

	return (`${date}T${hour}:${minutes}Z`)
}

const stocksController = {
	async quote(req: Request, res: Response){
		try {
			const { stock_name } = req.params

			if(!stock_name || stock_name === ""){
				throw new apiError(400, 'Insira um nome válido para a ação')
			}

			const { data } = (await api.get(`query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${process.env.AV_API_KEY}`))
			
			if(data.Note){
				throw new apiError(503, 'A API atingiu o limite de requisições por minuto, tente novamente em instantes')
			}

			//A api sempre retorna 200 independente se a ação foi encontrada ou não
			if(Object.keys(data['Global Quote']).length === 0){
				throw new apiError(404, 'Não foi possível encontrar a ação solicitada')
			}

			if(!data){
				throw new apiError(404, 'Não foi possível encontrar a ação solicitada')
			}
			
			const currentQuote = {
				name: data['Global Quote']['01. symbol'],
				lastPrice: Number(data['Global Quote']['05. price']),
				pricedAt: data['Global Quote']['07. latest trading day']
			}

			return res.json(currentQuote)

		} 
		catch (error) {
			return res.status(error.code || 500).json({Erro: error.message})
		}
		
	},
 
	async history(req: Request, res: Response){
		
		try {
			const { stock_name } = req.params
			let from = String(req.query.from)
			let to = String(req.query.to)

			try {
				validatePayload(from, to, stock_name)
			} catch (error) {
				throw new apiError(400, error.message)
			}
			
			const { data } = (await api.get(`/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock_name}&outputsize=full&apikey=${process.env.AV_API_KEY}`))
			validateResponse(data, stock_name)

			//Corrigindo fins de semana. Caso seja um domingo pula para a segunda, caso seja sábado volta para a sexta
			to = fixWeekends(to)
			from = fixWeekends(from)

			let response = {
				name: stock_name,
				prices: <any>[]
			}

			const dailyPrices = data['Time Series (Daily)']
			
			//Com os índices do início ao fim é possível percorrer o objeto como se fosse um array
			let indexTo = (Object.keys(dailyPrices).indexOf(to))
			let indexFrom = (Object.keys(dailyPrices).indexOf(from))

			//Caso a data seja muito antiga é substituída pela última data registrada nos dados
			if(indexFrom === -1 ){
				indexFrom = Object.keys(dailyPrices).length -1
			}
			//Como datas futuras ja foram válidadas se a data for a do dia e a bolsa não tiver fechado 
			//não irá possuir valor para o dia, logo é substituido pela data mais recente.
			if(indexTo === -1){
				indexTo = 0
			}
			
			for (let i = indexTo; i <= indexFrom; i++){
				const dailyObject = dailyPrices[Object.keys(dailyPrices)[i]]
				
				response.prices.push({
					opening: dailyObject['1. open'],
					low: dailyObject['3. low'],
					high: dailyObject['2. high'],
					closing: dailyObject['4. close'],
					pricedAt: Object.keys(dailyPrices)[i]
				})
			}

			return res.json(response)
		} catch (error) {
			return res.status(error.code || 500).json({Erro: error.message})
		}
		

	},

	async compare(req: Request, res: Response){
		try {
			const { stock_name } = req.params
			const { stocks } = req.body
		
			if(stock_name == ''|| !stock_name){
				throw new apiError(400, 'Insira um nome válido para a ação')
			}
			if(!Array.isArray(stocks) || stocks.length === 0){
				throw new apiError(400, 'É preciso enviar ao menos uma ação para comparação')
			}

			const stockData = (await api.get(`/query?function=TIME_SERIES_INTRADAY&symbol=${stock_name}&interval=5min&apikey=${process.env.AV_API_KEY}`)).data
			try {
				validateResponse(stockData)
			} catch (error) {
				throw new apiError(error.code, error.message)
			}

			const prices = stockData['Time Series (5min)']

			const response = {
				lastPrices: <any>[]
			}

			response.lastPrices.push({
				name: stock_name,
				lastPrice: prices[Object.keys(prices)[0]]['4. close'],
				pricedAt: parseDate(Object.keys(prices)[0])
			})


			for(var stock of stocks){
				const data = (await api.get(`/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${process.env.AV_API_KEY}`)).data
				try {
					validateResponse(data, String(stock))
				} catch (error) {
					throw new apiError(error.code, error.message )
				}

				const prices = data['Time Series (5min)']

				response.lastPrices.push({
					name: stock,
					lastPrice: prices[Object.keys(prices)[0]]['4. close'],
					pricedAt: parseDate(Object.keys(prices)[0])
				})
			}
			
			return res.json(response)

		} catch (error) {
			return res.status(error.code || 500).json({Erro: error.message})
		}
		

	},

	async gains(req: Request, res: Response){
		
		try {
			const { stock_name } = req.params
			const { purchasedAmount, purchasedAt } = req.query
			const dateFormat = /^(\d{4})[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/

			if(!stock_name || stock_name === ''){
				throw new apiError(400, 'Insira um nome válido para a ação')
			}
			if(Number(purchasedAmount) === NaN || !purchasedAmount || Number(purchasedAmount)<0){
				throw new apiError(400, '"purchaseAmount" deve ser um número positivo')
			}
			if(!dateFormat.test(String(purchasedAt))){
				throw new apiError(400 ,'Insira uma data válida no campo "purchasedAt", no formato yyyy-mm-dd')
			}

			const stockData = (await api.get(`/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock_name}&outputsize=full&apikey=${process.env.AV_API_KEY}`)).data
			try {
				validateResponse(stockData, stock_name)
			} catch (error) {
				throw new apiError(error.code, error.message)
			}

			const prices = stockData['Time Series (Daily)']

			if(Object.keys(prices).indexOf(String(purchasedAt)) === -1){
				throw new Error('Não existem dados de preço desta ação na data especificada')
			}

			const currentPrice = Number(prices[Object.keys(prices)[0]]['4. close'])
			const priceAtDate = Number(prices[String(purchasedAt)]['4. close'])

			const response = {
				name: stock_name,
				purchasedAmount,
				purchasedAt,
				priceAtDate,
				lastPrice: currentPrice,
				capitalGains: (currentPrice - priceAtDate)*Number(purchasedAmount)
			}

			return res.json(response)

		} 
		catch (error) {
			return res.status(error.code || 500).json({Erro: error.message})
		}
	}

}

export default stocksController