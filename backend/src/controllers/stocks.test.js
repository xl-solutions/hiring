const supertest = require("supertest");
const app = require("../app");

let stock_name = "PETR4.SA";
let invalid_stock_name = "testinvalid";

test("O servidor deve ter status 200", async() => {
    const response = await request(app).get(`/${stock_name}/quote`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(stock_name);
});

test("O servidor deve ter status 404", async() => {
    const response = await request(app.get(`/${invalid_stock_name}/quote`));

    expect(response.status).toBe(404);
    expect(response.text).toEqual('Ação não encontrada');
});