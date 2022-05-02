const RequestMock = require("mock-express-request");
const ResponseMock = require("mock-express-response");
require("dotenv").config();

const { getStockByName, getHistoryStock } = require("../controllers/stocks");

describe("Test unit StocksController", () => {
    const stock_name = "PETR4.SA";
    const invalid_stock_name = "dsadasd";

    test("should be return 200", async() => {
        const reqMock = new RequestMock({ method: "get", params: { stock_name } });
        const resMock = new ResponseMock({ request: reqMock });

        await getStockByName(reqMock, resMock);

        expect(resMock.statusCode).toBe(200);
        expect(resMock._getJSON().name).toBe(stock_name);
        expect(typeof resMock._getJSON().lastPrice).toBe("number");
    });

    test("should be return 400", async() => {
        const reqMock = new RequestMock({
            method: "get",
            params: { invalid_stock_name },
        });
        const resMock = new ResponseMock({ request: reqMock });

        await getStockByName(reqMock, resMock);

        expect(resMock.statusCode).toBe(400);
    });
});

describe("Test unit route history", () => {
    const stock_name = "PETR4.SA";
    const from = "2017-04-04"
    const to = "2017-04-05"

    test("should be return 200", async() => {
        const reqMock = new RequestMock({ method: "get", params: { stock_name }, query: { from, to } });
        const resMock = new ResponseMock({ request: reqMock });

        await getHistoryStock(reqMock, resMock);

        expect(resMock.statusCode).toBe(200);
    })

});