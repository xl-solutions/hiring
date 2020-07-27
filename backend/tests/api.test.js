const request = require('supertest')
const app = require("../app")
const url = "http://127.0.0.1:3003";

let count = 0;

jest.setTimeout(60000);

beforeEach(async () => {
  count++
  if (count == 5) {
    count = 0;
    await (new Promise(resolve => setTimeout(resolve, 60000)))
  }
});

const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

describe('Iniciando os testes unitários respostas com status 200...', () => {
  it('Teste função precoAtual, rota: /stocks/:stock_name/quote', async () => {
    const template = { stock_name: "PETR4.SA" }

    const rota = `/stocks/${template.stock_name}/quote`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(200);
    expect(resultado.name).toBe(template.stock_name);
  });

  it('Teste função precoHistorico, rota: /stocks/:stock_name/history', async () => {
    const template = { stock_name: "PETR4.SA", from: "2020-07-20", to: "2020-07-21" }
    const rota = `/stocks/${template.stock_name}/history?from="${template.from}"&to="${template.to}"`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(200);
    expect(resultado.name).toBe(template.stock_name);
  });

  it('Teste função compararAcoes, rota: /stocks/:stock_name/compare', async () => {
    const template = { stocks: ["PETR4.SA", "IBM"] }
    const rota = `/stocks/${template.stocks[0]}/compare`
    const { text, statusCode } = await request(url).post(rota).send(template).set(headers);;
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(200);
    expect(resultado.lastPrices[0].name).toBe(template.stocks[0]);
  });

  it('Teste função projetarGanhos, rota: /stocks/:stock_name/gains', async () => {
    const template = { stock_name: "PETR4.SA", purchasedAmount: "2", purchasedAt: "2020-07-24" }
    const rota = `/stocks/${template.stock_name}/gains?purchasedAmount=${template.purchasedAmount}&purchasedAt=${template.purchasedAt}`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(200);
    expect(resultado.name).toBe(template.stock_name);
  });
});

describe('Iniciando os testes unitários respostas com status 404, falta parametro stock_name...', () => {
  it('Teste função precoAtual, rota: /stocks/:stock_name/quote', async () => {
    const rota = `/stocks//quote`
    const { statusCode } = await request(url).get(rota).set(headers);

    expect(statusCode).toBe(404);
  });

  it('Teste função precoHistorico, rota: /stocks/:stock_name/history', async () => {
    const template = { from: "2020-07-20", to: "2020-07-21" }
    const rota = `/stocks//history?from="${template.from}"&to="${template.to}"`
    const { statusCode } = await request(url).get(rota).set(headers);

    expect(statusCode).toBe(404);
  });

  it('Teste função compararAcoes, rota: /stocks/:stock_name/compare', async () => {
    const template = { stocks: ["PETR4.SA", "IBM"] }
    const rota = `/stocks//compare`
    const { statusCode } = await request(url).post(rota).send(template).set(headers);;

    expect(statusCode).toBe(404);
  });

  it('Teste função projetarGanhos, rota: /stocks/:stock_name/gains', async () => {
    const template = { purchasedAmount: "2", purchasedAt: "2020-07-24" }
    const rota = `/stocks//gains?purchasedAmount=${template.purchasedAmount}&purchasedAt=${template.purchasedAt}`
    const { statusCode } = await request(url).get(rota).set(headers);

    expect(statusCode).toBe(404);
  });
});

describe('Iniciando os testes unitários respostas com status 400, stock_name incorreto...', () => {
  it('Teste função precoAtual, rota: /stocks/:stock_name/quote', async () => {
    const template = { stock_name: "wqsadadw" }
    const rota = `/stocks/${template.stock_name}/quote`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(400);
    expect(resultado.erro).toBe(`Erro ao consultar o preço atual da ação: ${template.stock_name}`);
  });

  it('Teste função precoHistorico, rota: /stocks/:stock_name/history', async () => {
    const template = { stock_name: "wqsadadw", from: "2020-07-20", to: "2020-07-21" }
    const rota = `/stocks/${template.stock_name}/history?from="${template.from}"&to="${template.to}"`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(400);
    expect(resultado.erro).toBe(`Erro ao consultar o histórico de preços da ação: ${template.stock_name}`);
  });

  it('Teste função compararAcoes, rota: /stocks/:stock_name/compare', async () => {
    const template = { stocks: ["wqsadadw", "IBM"] }
    const rota = `/stocks/${template.stocks[0]}/compare`
    const { text, statusCode } = await request(url).post(rota).send(template).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(400);
    expect(resultado.erro).toBe(`Erro ao consultar o histórico de preços da ação: ${template.stocks[0]}, por esse motivo não foi possivel trazer as comparações.`);
  });

  it('Teste função projetarGanhos, rota: /stocks/:stock_name/gains', async () => {
    const template = { stock_name: "wqsadadw", purchasedAmount: "2", purchasedAt: "2020-07-24" }
    const rota = `/stocks/${template.stock_name}/gains?purchasedAmount=${template.purchasedAmount}&purchasedAt=${template.purchasedAt}`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(400);
    expect(resultado.erro).toBe(`Erro ao projetar ganhos para a ação: ${template.stock_name}`);
  });
});

describe('Iniciando os testes unitários respostas com status 400, query incorreta...', () => {
  it('Teste função precoHistorico, sem query from, rota: /stocks/:stock_name/history', async () => {
    const template = { stock_name: "PETR4.SA", to: "2020-07-21" }
    const rota = `/stocks/${template.stock_name}/history?from=&to="${template.to}"`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(400);
    expect(resultado.erro).toBe(`Falta parâmetros na query, from e to são obrigatórios.`);
  });

  it('Teste função precoHistorico, query to vazia, rota: /stocks/:stock_name/history', async () => {
    const template = { stock_name: "PETR4.SA", from: "2020-07-20" }
    const rota = `/stocks/${template.stock_name}/history?from="${template.from}"&to=`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(400);
    expect(resultado.erro).toBe(`Falta parâmetros na query, from e to são obrigatórios.`);
  });

  it('Teste função projetarGanhos, query purchasedAmount vazia, rota: /stocks/:stock_name/gains', async () => {
    const template = { stock_name: "PETR4.SA", purchasedAt: "2020-07-24" }
    const rota = `/stocks/${template.stock_name}/gains?purchasedAmount=&purchasedAt=${template.purchasedAt}`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(400);
    expect(resultado.erro).toBe(`Falta parâmetros na query, purchasedAmount e purchasedAt são obrigatórios.`);
  });

  it('Teste função projetarGanhos, query purchasedAt vazia, rota: /stocks/:stock_name/gains', async () => {
    const template = { stock_name: "PETR4.SA", purchasedAmount: "2" }
    const rota = `/stocks/${template.stock_name}/gains?purchasedAmount=${template.purchasedAmount}&purchasedAt=`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(400);
    expect(resultado.erro).toBe(`Falta parâmetros na query, purchasedAmount e purchasedAt são obrigatórios.`);
  });

  it('Teste função projetarGanhos, query purchasedAmount = 0, rota: /stocks/:stock_name/gains', async () => {
    const template = { stock_name: "PETR4.SA", purchasedAmount: "0", purchasedAt: "2020-07-20" }
    const rota = `/stocks/${template.stock_name}/gains?purchasedAmount=${template.purchasedAmount}&purchasedAt=${template.purchasedAt}`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(400);
    expect(resultado.erro).toBe(`A data da compra precisa ser maior que zero`);
  });
});
describe('Iniciando os testes unitários respostas com status 400, query incorreta parte 2...', () => {
  it('Teste função projetarGanhos, query purchasedAt menor que a data de hoje, rota: /stocks/:stock_name/gains', async () => {
    const template = { stock_name: "PETR4.SA", purchasedAmount: "1", purchasedAt: "2120-07-18" }
    const rota = `/stocks/${template.stock_name}/gains?purchasedAmount=${template.purchasedAmount}&purchasedAt=${template.purchasedAt}`
    const { text, statusCode } = await request(url).get(rota).set(headers);
    const resultado = JSON.parse(text);

    expect(statusCode).toBe(400);
    expect(resultado.erro).toBe(`A data da compra precisa ser maior que a data de hoje`);
  });
});