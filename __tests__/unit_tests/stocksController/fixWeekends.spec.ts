import { fixWeekends } from '../../../src/controllers/stocksController'

describe('Arredonda a data para remover fins de semana', () => {
	it('Deve transformar um domingo em uma segunda', () => {
		const newDate = fixWeekends('2021-02-07')

		expect(newDate).toBe('2021-02-08')
	})

	it('Deve transformar um sábado em uma sexta feira', () => {
		const newDate = fixWeekends('2021-02-06')

		expect(newDate).toBe('2021-02-05')
	})
})