import handler from "../../../../../../pages/api/stocks/[stock_name]/history";
describe("handler", () => {
    describe("QUANDO os parâmetros estão corretos e a requisição é bem-sucedida", () => {
        test("Retorna objeto com informações de preços históricos", async () => {
            const stockName = "PETR4.SA";
            const from = "2022-01-01";
            const to = "2022-01-10";

            const result = await handler({
                query: {
                    stock_name: stockName,
                    from: from,
                    to: to,
                },
            }, {});

            const expected = {
                oppening: "R$ 35,02",
                low: "R$ 33,63",
                high: "R$ 35,59",
                close: "R$ 34,28",
                pricedAt: "2022-01-09T03:00:00.000Z",
            };
            
            expect(result.statusCode).toBe(200);
            expect(result.body).toEqual(expected);
        });
    });

    describe("QUANDO os parâmetros estão incorretos ou a requisição falha", () => {
        test("Retorna status code 500 e mensagem de erro", async () => {
            const stockName = "PETR4.SA";
            const from = "2022-01-01";
            const to = "2022-01-31";

            const result = await handler({
                query: {
                    stock_name: stockName,
                    from: from,
                    to: to,
                },
            }, {});

            expect(result.statusCode).toBe(500);
            expect(result.body).toEqual({ error: "Erro ao obter cotação." });
        });
    });
});
