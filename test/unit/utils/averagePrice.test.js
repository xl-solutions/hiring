const { default: calculateAverage } = require("../../../utils/averagePrice");

describe("AveragePrice", () => {
    describe("QUANDO os valores são float em currency BRL", () => {
        test("Retorna valor formatado", () => {
            const high = "R$ 2,00";
            const low = "R$ 10,00";
            
            const result = calculateAverage(high,low);
            

            const expected = "R$ 6,00";
            expect(result).toEqual(expected);
        })
    })
})