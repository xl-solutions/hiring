const app = require("../../src/app");
const request = require("supertest");

const stock_name = "IBM";
const invalid_stock_name = "jjssjjss";

const from = "2021-01-01";
const to = "2021-01-10";
const invalid_from = "20220-01-111";
const invalid_to = "2021-021-112";

const purchasedAmount = 10;
const invalid_purchasedAmount = -10;

let count = 0;

jest.setTimeout(60000);

beforeEach(async () => {
  count++;
  if (count == 5) {
    count = 0;
    await new Promise((resolve) => setTimeout(resolve, 60000));
  }
});

describe("Testes da rota '/quote' do controller stocksController", () => {
  it("Precisa que retorne status 200 com todas as opções válidas", async () => {
    const response = await request(app).get(`/stocks/${stock_name}/quote`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("name");

    expect(response.body).toHaveProperty("lastPrice");

    expect(response.body).toHaveProperty("pricedAt");
  });

  it("Precisa que retorne status 404 e um erro válido", async () => {
    const response = await request(app).get(`/stocks/${invalid_stock_name}/quote`);

    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty("erro");
  });
});

describe("Testes da rota /history do controller stocksController", () => {
  it("Código de status deve ser 200 e ter opções válidas", async () => {
    const response = await request(app).get(`/stocks/${stock_name}/history?from=${from}&to=${to}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("name");

    expect(response.body).toHaveProperty("prices");
  });

  it("Código de status deve ser 400 com um erro válido (argumento incorreto - to)", async () => {
    const response = await request(app).get(`/stocks/${stock_name}/history?from=${invalid_from}&to=`);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("erro");
  });

  it("Código de status deve ser 400 com um erro válido (argumento incorreto - from)", async () => {
    const response = await request(app).get(`/stocks/${stock_name}/history?from=&to=${invalid_to}`);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("erro");
  });

  it("Código de status deve ser 400 com um erro válido (formato de data invalido - from)", async () => {
    const response = await request(app).get(`/stocks/${stock_name}/history?from=${invalid_from}&to=${to}`);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("erro");
  });

  it("Código de status deve ser 400 com um erro válido (formato de data invalido - to)", async () => {
    const response = await request(app).get(`/stocks/${stock_name}/history?from=${from}&to=${invalid_to}`);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("erro");
  });

  it("Código de status deve ser 400 com um erro válido (data inicial maior que final)", async () => {
    const response = await request(app).get(`/stocks/${stock_name}/history?from=${to}&to=${from}`);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("erro");
  });

  it("Código de status deve ser 404 com um erro válido ", async () => {
    const response = await request(app).get(`/stocks/${invalid_stock_name}/history?from=${from}&to=${to}`);

    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty("erro");
  });
});

describe("Testes da rota /compare do controller stocksController", () => {
  it("Código de status deve ser 200", async () => {
    const response = await request(app)
      .get(`/stocks/${stock_name}/compare`)
      .send({
        stocks: [""],
      });

    expect(response.status).toBe(200);
  });

  it("Código de status 404 com uma mensagem de erro valida", async () => {
    const response = await request(app)
      .get(`/stocks/${invalid_stock_name}/compare`)
      .send({
        stocks: ["DOL"],
      });

    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty("erro");
  });
});

describe("Testes da rota /gains do controller stocksController", () => {
  it("Código de status deve ser 200 com todas opções válidas", async () => {
    const response = await request(app).get(
      `/stocks/${stock_name}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${from}`
    );

    expect(response.status).toBe(200);
  });

  it("Código de status 400 com um erro válido (Numero de açoes invalido)", async () => {
    const response = await request(app).get(`/stocks/${stock_name}/gains?purchasedAmount=&purchasedAt=${from}`);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("erro");
  });

  it("Código de status 400 com um erro válido (Numero de açoes negativo)", async () => {
    const response = await request(app).get(
      `/stocks/${stock_name}/gains?purchasedAmount=${invalid_purchasedAmount}&purchasedAt=${from}`
    );

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("erro");
  });

  it("Código de status 400 com um erro válido (Data com formato invalido)", async () => {
    const response = await request(app).get(
      `/stocks/${stock_name}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${invalid_from}`
    );

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("erro");
  });

  it("Código de status 404 com um erro válido (stock_name invalido)", async () => {
    const response = await request(app).get(
      `/stocks/${invalid_stock_name}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${from}`
    );

    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty("erro");
  });
});
