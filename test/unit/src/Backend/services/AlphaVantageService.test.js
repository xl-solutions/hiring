import AlphaVantageService from "@/Backend/services/alphaVantageService"
import { BadRequestError } from "@/shared/error/BadRequestError"
describe("AlphaVantageService", () => {
    describe("getCotacaoMaisRecente", () => {
        describe("QUANDO o symbol está descrito e correto", () => {
            test("Retorna valor de cotação", async () => {
                const symbol = "VALE5.SA"

                const result = await AlphaVantageService.getCotacaoMaisRecente(symbol)

                expect(result).not.toBeUndefined();
            })
        })
        describe("QUANDO o symbol está descrito e não esta correto", () => {
            test("Retorna undefined", async () => {
                const symbol = "0000"

                const result = await AlphaVantageService.getCotacaoMaisRecente(symbol)

                expect(result).toBeUndefined();
            })
        })
        describe("QUANDO o symbol não está descrito ", () => {
            test("Retorna undefined", async () => {
                const symbol = "0000"

                const result = await AlphaVantageService.getCotacaoMaisRecente(symbol)

                expect(result).toBeUndefined();
            })
        })
    })
    describe("getHistoricalPrices", () => {
        describe("QUANDO o symbol está descrito e correto , QUANDO from e to são datas", () => {
            test("Retorna array com data e preço", async () => {
                const symbol = "USIM5.SA"
                const from = "2023-02-04"
                const to = "2023-02-06"


                const result = await AlphaVantageService.getHistoricalPrices(symbol, from, to)

                const expected = [{ "date": "2023-02-06", "price": "7.67" }]
                expect(result).toEqual(expected);
            })
        })
        describe("QUANDO o symbol não está descrito  , QUANDO from e to são datas", () => {
            test("Retorna BadRequest", async () => {
                const symbol = ""
                const from = "2023-02-04"
                const to = "2023-02-06"


                await expect(AlphaVantageService.getHistoricalPrices(symbol, from, to)).rejects.toThrow(BadRequestError);
            })
        })
        describe("QUANDO o symbol  está descrito mas não esta correto , QUANDO from e to são datas", () => {
            test("Retorna BadRequest", async () => {
                const symbol = "USIM5.S"
                const from = "2023-02-04"
                const to = "2023-02-06"


                await expect(AlphaVantageService.getHistoricalPrices(symbol, from, to)).rejects.toThrow(BadRequestError);
            })
        })
        describe("QUANDO o symbol  está descrito esta correto , QUANDO from e to não  são datas válidas", () => {
            test("Retorna BadRequest", async () => {
                const symbol = "USIM5.SA"
                const from = "2023-02-0499"
                const to = "2023-02-0611"


                await expect(AlphaVantageService.getHistoricalPrices(symbol, from, to)).rejects.toThrow(BadRequestError);
            })
        })
    })
    describe("getGains", () => {
        describe("QUANDO o symbol está descrito e correto, QUANDO purchasedAmount é número e válido, QUANDO purchasedAt é data válida", () => {
            test("Retorna objeto com as informações de ganhos esperadas", async () => {
                
                const stockName = "PETR4.SA";
                const purchasedAmount = 100;
                const purchasedAt = "2022-01-01";


                const result = await AlphaVantageService.getGains(stockName, purchasedAmount, purchasedAt);


                const expected = {
                    name: "PETR4.SA",
                    purchasedAmount: 100,
                    purchasedAt: "2022-01-01",
                    purchasedPrice: expect.any(String),
                    lastPrice: expect.any(String),
                    capitalGains: expect.any(String)
                };
                expect(result).toMatchObject(expected);
                expect(parseFloat(result.purchasedPrice.slice(3).replace(",", "."))).toBeGreaterThan(0);
                expect(parseFloat(result.lastPrice.slice(3).replace(",", "."))).toBeGreaterThan(0);
                expect(parseFloat(result.capitalGains.slice(3).replace(",", "."))).toBeGreaterThan(0);
            });
        })
        describe("QUANDO a API não consegue buscar informações da ação", () => {
            test("Retorna erro com a mensagem apropriada", async () => {

                const stockName = "XXXXX";
                const purchasedAmount = 100;
                const purchasedAt = "2022-01-01";


                await expect(AlphaVantageService.getGains(stockName, purchasedAmount, purchasedAt)).rejects.toThrow(
                    "Erro ao projetar ganhos"
                );
            });
        });

        describe("QUANDO não há informações de preços na data de compra", () => {
            test("Retorna erro com a mensagem apropriada", async () => {

                const stockName = "PETR4.SA";
                const purchasedAmount = 100;
                const purchasedAt = "2050-01-01";


                await expect(AlphaVantageService.getGains(stockName, purchasedAmount, purchasedAt)).rejects.toThrow(
                    "Erro ao projetar ganhos"
                );
            });
        });

        describe("QUANDO a API não consegue buscar informações da ação para a data de venda", () => {
            test("Retorna erro com a mensagem apropriada", async () => {

                const stockName = "PETR4.SA";
                const purchasedAmount = 100;
                const purchasedAt = "2000-01-01";


                await expect(AlphaVantageService.getGains(stockName, purchasedAmount, purchasedAt)).rejects.toThrow(
                    "Erro ao projetar ganhos"
                );
            });
        });

    })
    describe('compareStocks', () => {
        test('retorna um objeto com a chave "lastPrices"', async () => {
            const response = await AlphaVantageService.compareStocks('PETR4.SA', { stocks: ['VALE5.SA'] });
            expect(response).toHaveProperty('lastPrices');
        });

        test('retorna a quantidade correta de preços para o número de ações solicitadas', async () => {
            const response = await AlphaVantageService.compareStocks('PETR4.SA', { stocks: ['VALE5.SA', 'ITUB4.SA'] });
            expect(response.lastPrices).toHaveLength(3);
        });

        test('retorna um erro caso o parâmetro "stock_name" esteja faltando', async () => {
            await expect(AlphaVantageService.compareStocks(undefined, { stocks: ['VALE5.SA'] })).rejects.toThrow('Erro ao comparar ações');
        });

        test('retorna um erro caso o payload não esteja no formato JSON esperado', async () => {
            await expect(AlphaVantageService.compareStocks('PETR4.SA', 'VALE5.SA')).rejects.toThrow('Erro ao comparar ações');
        });

        test('retorna um erro caso não seja possível obter os preços das ações solicitadas', async () => {
            await expect(AlphaVantageService.compareStocks('INVALID_STOCK', { stocks: ['VALE5.SA'] })).rejects.toThrow('Erro ao comparar ações');
        });
    });

})