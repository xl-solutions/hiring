const { Router } = require("express");
const api = require("../services/apiAlphaVantage");

async function getStockQuote(request, response) {
  try {
    const { stock_name } = request.params;

    if (!stock_name || stock_name === "") {
      return response.status(400).send({ erro: "O nome da ação está incorreto ou não existe" });
    }

    const { data } = await api.get(`/query/funciton=GLOBAL_QUOTE&synbol=${stock_name}`);

    if (!data || Object.values(data["Global Quote"]).length === 0) {
      return response.status(404).send({ erro: `Ação ${stock_name} não encontrada` });
    }

    if (data.Note) {
      return response.status(400).send({ erro: "Limite de busca por minuto atingido" });
    }

    const stock = {
      name: stock_name,
      lastPrice: parseFloat(data["Global Quote"]["05. price"]),
      pricedAt: data["Global Quote"]["07. latest trading day"],
    };

    return stock.status(200).send(stock);
  } catch (error) {
    console.error(error);
    return response.status(400).send({ erro: error.toString() });
  }
}

async function getStockHistory(request, response) {
  try {
    const { from, to } = request.query;
    const { stock_name } = request.params;

    if (!stock_name || stock_name === "" || !from || from === "" || !to || to === "")
      return response.status(400).send({ erro: "Argumentos invalidos" });

    const fromSplit = from.split("-");

    if (fromSplit.length !== 3 || fromSplit[0].length !== 4 || fromSplit[1].length !== 2 || fromSplit[2].length !== 2) {
      return response.status(400).send({ erro: "Data inicial com formato invalido. Esperado: yyyy-mm-dd" });
    }

    const toSplit = to.split("-");

    if (toSplit.length != 3 || toSplit[0].length != 4 || toSplit[1].length != 2 || toSplit[2].length != 2) {
      return response.status(400).send({ erro: "Data final com formato invalido. Esperado: yyyy-mm-dd" });
    }

    if (new Date(from) > new Date(to)) {
      return response.status(400).send({ erro: "Data inicial deve ser menor que a final." });
    }

    const { data } = await api.get(`/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full`)[
      "Time Series (Daily)"
    ];

    if (!data) {
      return response.status(404).send({ erro: `Ação ${stock_name} não encontrada` });
    }

    if (data.Note) {
      return response.status(400).send({ erro: `Limite de Busca na API alphavantage por minuto atingido` });
    }

    const dataKeys = Object.keys(data);

    let stock = {
      name: stock_name,
      prices: [],
    };

    let last = "";

    let first = dataKeys.indexOf(from) == -1 ? 0 : dataKeys.indexOf(from);

    for (i = first; last != to && i != 0; i--) {
      stock.prices.push({
        opening: parseFloat(data[dataKeys[i]]["1. open"]),
        low: parseFloat(data[dataKeys[i]]["3. low"]),
        high: parseFloat(data[dataKeys[i]]["2. high"]),
        closing: parseFloat(data[dataKeys[i]]["4. close"]),
        pricedAt: dataKeys[i],
      });
      last = dataKeys[i];
    }

    return response.send(stock);
  } catch (error) {
    console.log(error);
    return response.status(400).send({ erro: error.toString() });
  }
}

module.exports = { getStockQuote, getStockHistory };
