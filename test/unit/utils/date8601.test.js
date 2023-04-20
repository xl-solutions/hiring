import DataFormat from "../../../utils/date8601";
describe("DataFormat8601", () => {
    describe("QUANDO valor é timestampUtc-3", () => {
        test("Retorna valor formatado", () => {
            const valor = new Date("2016-05-31T00:00:00.000");

            
            const result = DataFormat(valor);
            

            const expected = "2016-31-05";
            expect(result).toEqual(expected);
        })
    })
})