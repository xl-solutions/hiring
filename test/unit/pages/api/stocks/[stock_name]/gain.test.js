import handler from "../../../../../../pages/api/stocks/[stock_name]/gains"
describe("handler", () => {
    describe("QUANDO a rota é chamada com parâmetros válidos", () => {
        test("Retorna status 200 com os ganhos da ação", async () => {
            const req = {
                query: {
                    stock_name: "USIM5.SA",
                    purchasedAmount: 100,
                    purchasedAt: "2016-05-31"
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            await handler(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalled()
        })
    })

    describe("QUANDO a rota é chamada com parâmetros inválidos", () => {
        test("Retorna status 500 com mensagem de erro", async () => {
            const req = {
                query: {
                    stock_name: "",
                    purchasedAmount: "not_a_number",
                    purchasedAt: "not_a_date"
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            await handler(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao obter cotação.' })
        })
    })
})
