const { default: DataFormat } = require("../../../utils/dateUtils");

describe("DataFormat", () => {
    describe("QUANDO data vem em formato timestampUtc-3", () => {
        test("Retorna valor formatado", () => {
            const valor = new Date("2016-05-31T00:00:00.000");

            
            const result = DataFormat(valor);
            

            const expected = "31/05/2016";
            expect(result).toEqual(expected);
        })
    })
})