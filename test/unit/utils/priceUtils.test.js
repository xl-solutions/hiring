import formatCurrency from "../../../utils/priceUtils"

describe("formatCurrency", () => {
    describe("QUANDO valor é inteiro", () => {
        test("Retorna valor formatado", () => {
            const valor = 2;

            
            const result = formatCurrency(valor);
            

            const expected = "R$ 2,00";
            expect(result).toEqual(expected);
        })
    })
})