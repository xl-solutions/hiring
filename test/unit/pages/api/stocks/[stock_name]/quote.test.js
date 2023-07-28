import handler from "../../../../../../pages/api/stocks/[stock_name]/quote";
describe("handler", () => {
    describe("QUANDO os parâmetros estão corretos e a requisição é bem-sucedida", () => {
        test("Retorna objeto com informações de preços mais recentes", async () => {
            const stockName = "PETR4.SA";
            const result = await handler({
                query: {
                    stock_name: stockName,
                },
            }, {});

            const expected = {
                name: stockName,
                price: expect.stringMatching(/^\R\$\s\d+,\d{2}$/),
                date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
            };

            expect(result.statusCode).toBe(200);
            expect(result.body).toMatchObject(expected);
        });
    });
    describe("QUANDO os parâmetros estão incorretos ou a requisição falha", () => {
        test("Retorna status code 500 e mensagem de erro", async () => {
        const stockName = "PETR4.SA123";
        const result = await handler({
            query: {
              stock_name: stockName,
            },
          }, {});
        
          expect(result.statusCode).toBe(500);
          expect(result.body).toEqual({ error: "Erro ao obter cotação." });
        });
    });
});        