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
                // Preparação dos dados de entrada
                const stockName = "PETR4.SA";
                const purchasedAmount = 100;
                const purchasedAt = "2022-01-01";

                // Execução da função
                const result = await AlphaVantageService.getGains(stockName, purchasedAmount, purchasedAt);

                // Verificação do resultado esperado
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
                // Preparação dos dados de entrada
                const stockName = "XXXXX";
                const purchasedAmount = 100;
                const purchasedAt = "2022-01-01";

                // Execução da função
                await expect(AlphaVantageService.getGains(stockName, purchasedAmount, purchasedAt)).rejects.toThrow(
                    "Api não conseguiu buscar informações desta ação"
                );
            });
        });

        describe("QUANDO não há informações de preços na data de compra", () => {
            test("Retorna erro com a mensagem apropriada", async () => {
                // Preparação dos dados de entrada
                const stockName = "PETR4.SA";
                const purchasedAmount = 100;
                const purchasedAt = "2050-01-01";

                // Execução da função
                await expect(AlphaVantageService.getGains(stockName, purchasedAmount, purchasedAt)).rejects.toThrow(
                    "Não há dados de preços na data de compra"
                );
            });
        });

        describe("QUANDO a API não consegue buscar informações da ação para a data de venda", () => {
            test("Retorna erro com a mensagem apropriada", async () => {
                // Preparação dos dados de entrada
                const stockName = "PETR4.SA";
                const purchasedAmount = 100;
                const purchasedAt = "2010-01-01";

                // Execução da função
                await expect(AlphaVantageService.getGains(stockName, purchasedAmount, purchasedAt)).rejects.toThrow(
                    "Api não consegui Buscar informações desta ação para está data"
                );
            });
        });
    })
})