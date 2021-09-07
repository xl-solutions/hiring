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

    const response = {
      name: stock_name,
      lastPrice: parseFloat(data["Global Quote"]["05. price"]),
      pricedAt: data["Global Quote"]["07. latest trading day"],
    };

    return response.status(200).send(response);
  } catch (error) {
    console.error(error);
    return response.status(400).send({ erro: error.toString() });
  }
}

module.exports = { getStockQuote };
