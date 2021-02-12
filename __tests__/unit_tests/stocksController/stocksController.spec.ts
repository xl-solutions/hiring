import { response } from 'express'
import request from 'supertest'
import app from '../../../src/app'

const stock = 'AAPL'
const invalidStock = 'NotValid'

const date = '2021-02-08'
const date2 = '2021-02-11'
const invalidDate = 'year-15-60'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let count = 0
beforeEach(async () => {
	if(count === 5){
		await sleep(60000)
	}
	if(count > 5){
		await sleep(30000)
	}
	count++
})

jest.setTimeout(100000)

describe('Cotação atual da ação', () => {
	it('Deve retornar erro pois a ação não existe', async () => {
		expect.assertions(3)
		const data = await request(app).get(`/stocks/${invalidStock}/quote`)

		expect(data.status).toBe(404)
		expect(data.body).toHaveProperty('Erro')
		expect(data.body['Erro']).toBe('Não foi possível encontrar a ação solicitada')
	})

	it('Deve retornar a cotação atual da ação', async () => {
		const data = await request(app).get(`/stocks/${stock}/quote`)

		expect(data.body).toHaveProperty('name')
		expect(data.body).toHaveProperty('lastPrice')
		expect(data.body).toHaveProperty('pricedAt')
	})
})

describe('Valores históricos de determinada ação', () => {
	it('Deve retornar erro pois a ação não existe', async () => {
		const data = await request(app).get(`/stocks/${invalidStock}/history?from=${date}&to=${date}`)

		expect(data.status).toBe(404)
		expect(data.body['Erro']).toBe(`Não foi possível encontrar dados da ação ${invalidStock}, confira os dados e tente novamente`)
	})

	it('Deve retornar erro pois a data data "from" está em formato inválido', async () => {
		const data = await request(app).get(`/stocks/${stock}/history?from=${invalidDate}&to=${date}`)

		expect(data.status).toBe(400)
		expect(data.body['Erro']).toBe('Insira uma data válida em "from", no formato "yyyy-mm-dd"')
	})

	it('Deve retornar erro pois a data data "to" está em formato inválido', async () => {
		const data = await request(app).get(`/stocks/${stock}/history?from=${date}&to=${invalidDate}`)

		expect(data.status).toBe(400)
		expect(data.body['Erro']).toBe('Insira uma data válida em "to", no formato "yyyy-mm-dd"')
	})

	it('Deve retornar sucesso', async () => {
		const data = await request(app).get(`/stocks/${stock}/history?from=${date}&to=${date2}`)

		expect(data.status).toBe(200)
		expect(data.body).toHaveProperty('name')
		expect(data.body.name).toBe(stock)

		expect(data.body.prices.length).toBe(4)
		expect(data.body.prices[0]).toHaveProperty('opening')
		expect(data.body.prices[0]).toHaveProperty('low')
		expect(data.body.prices[0]).toHaveProperty('high')
		expect(data.body.prices[0]).toHaveProperty('closing')
		expect(data.body.prices[0]).toHaveProperty('pricedAt')

	})
})

describe('Comparação entre ações', () => {
	it('Deve retornar erro pois o array de ações não foi passado', async () => {
		const data = await request(app).get(`/stocks/${stock}/compare`)

		expect(data.status).toBe(400)
		expect(data.body['Erro']).toBe('É preciso enviar ao menos uma ação para comparação')
	})

	it('Deve retornar erro pois uma das ações enviadas não existe', async () => {
		const data = await request(app).get(`/stocks/${stock}/compare`).send({
			stocks: [invalidStock, 'IBM']
		})

		expect(data.status).toBe(404)
		expect(data.body['Erro']).toBe(`Não foi possível encontrar dados da ação ${invalidStock}, confira os dados e tente novamente`)
	})

	it('Deve retornar o array com os preços de todas as ações', async () => {
		const data = await request(app).get(`/stocks/${stock}/compare`).send({
			stocks: [stock, 'IBM']
		})

		expect(data.status).toBe(200)
		expect(data.body).toHaveProperty('lastPrices')
		expect(Array.isArray(data.body.lastPrices)).toBe(true)
		
		expect(data.body.lastPrices[0]).toHaveProperty('name')
		expect(data.body.lastPrices[0]).toHaveProperty('lastPrice')
		expect(data.body.lastPrices[0]).toHaveProperty('pricedAt')

	})
})


describe('Projeção de ganhos', () => {
	let validAmount = 3
	let invalidAmount = -4
	it('Deve retornar erro pois a quantidade não é válida', async () => {
		const data = await request(app).get(`/stocks/${stock}/gains?purchasedAmount=${invalidAmount}&purchasedAt=${date}`)
		
		expect(data.status).toBe(400)
		expect(data.body['Erro']).toBe('"purchaseAmount" deve ser um número positivo')
	})

	it('Deve retornar erro pois a data está inválida', async () => {
		const data = await request(app).get(`/stocks/${stock}/gains?purchasedAmount=${validAmount}&purchasedAt=${invalidDate}`)

		expect(data.status).toBe(400)
		expect(data.body['Erro']).toBe('Insira uma data válida no campo "purchasedAt", no formato yyyy-mm-dd')
	})

	it('Deve retornar erro pois a ação não existe', async () => {
		const data = await request(app).get(`/stocks/${invalidStock}/gains?purchasedAmount=${validAmount}&purchasedAt=${date}`)

		expect(data.status).toBe(404)
		expect(data.body['Erro']).toBe(`Não foi possível encontrar dados da ação ${invalidStock}, confira os dados e tente novamente`)
	})

	it('Deve retornar corretamente a projeção de ganhos', async () => {
		const data = await request(app).get(`/stocks/${stock}/gains?purchasedAmount=${validAmount}&purchasedAt=${date}`)

		expect(data.status).toBe(200)
		
		expect(data.body).toHaveProperty('name')
		expect(data.body).toHaveProperty('purchasedAmount')
		expect(data.body).toHaveProperty('purchasedAt')
		expect(data.body).toHaveProperty('priceAtDate')
		expect(data.body).toHaveProperty('lastPrice')
		expect(data.body).toHaveProperty('capitalGains')
	})
})
