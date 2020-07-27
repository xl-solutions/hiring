const fetch = require('node-fetch')
module.exports = function (app) {
    let controller = {};
    let apiKey = process.env.API_KEY || "SSRGY9BBODGQ1T55";
    let urlApi = process.env.URL_API || "https://www.alphavantage.co"

    /**
     * precoAtual
     * @param {Object} req
     * @param {Object} res
     * @method GET
     * @route /stocks/:stock_name/quote
     */

    controller.precoAtual = async (req, res) => {
        try {
            let { stock_name } = req.params;

            let resposta = await fetch(`${urlApi}/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${apiKey}`);
            if (resposta.status == 200) {
                resposta = await resposta.json()
                if (resposta['Global Quote']) {
                    if (resposta['Global Quote']["05. price"] == null) {
                        return res.status(400).json({
                            erro: `Erro ao consultar o preço atual da ação: ${stock_name}`
                        });
                    }
                    return res.status(200).json({
                        name: stock_name,
                        lastPrice: parseFloat(resposta['Global Quote']["05. price"]),
                        pricedAt: resposta['Global Quote']["07. latest trading day"]
                    });
                } else {
                    return res.status(400).json({
                        erro: `Erro ao consultar o preço atual da ação: ${stock_name}`
                    });
                }
            } else {
                return res.status(502).json({
                    erro: 'Erro ao consultar a api da alpha vantage'
                });
            }
        } catch (error) {
            console.log("app - controllers - apiRequest - precoAtual: ", error);
            return res.status(500)
        }
    }

    /**
     * precoHistorico
     * @param {Object} req
     * @param {Object} res
     * @method GET
     * @route /stocks/:stock_name/history
     */

    controller.precoHistorico = async (req, res) => {
        try {
            let { stock_name } = req.params;
            let { from, to } = req.query;

            if (!from || from == null || from == "" || !to || to == null || to == "") {
                return res.status(400).json({
                    erro: "Falta parâmetros na query, from e to são obrigatórios."
                });
            }
            if (from > to) {
                return res.status(400).json({
                    erro: "A data inicial não pode ser menor que a atual."
                });
            }

            let resposta = await fetch(`${urlApi}/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=${apiKey}`);
            if (resposta.status == 200) {
                resposta = await resposta.json();
                if (resposta['Time Series (Daily)']) {
                    let dados = resposta['Time Series (Daily)'];
                    let data = {
                        name: stock_name,
                        prices: []
                    }
                    let chaves = Object.keys(dados).reverse();
                    for (let i = 0; i < chaves.length; i++) {
                        if (chaves[i] >= from && chaves[i] <= to) {
                            data.prices.push({
                                opening: parseFloat(dados[chaves[i]]['1. open']),
                                low: parseFloat(dados[chaves[i]]['3. low']),
                                high: parseFloat(dados[chaves[i]]['2. high']),
                                closing: parseFloat(dados[chaves[i]]['4. close']),
                                pricedAt: chaves[i]
                            });
                        }
                    }
                    return res.status(200).json(data);
                } else {
                    return res.status(400).json({
                        erro: `Erro ao consultar o histórico de preços da ação: ${stock_name}`,
                    });
                }
            } else {
                res.status(502).json({
                    erro: 'Erro ao consultar a api da alpha vantage'
                });
            }
        } catch (error) {
            console.log("app - controllers - apiRequest - precoHistorico: ", error);
            res.status(500)
        }
    }

    /**
     * compararAcoes
     * @param {Object} req
     * @param {Object} res
     * @method POST
     * @route /stocks/:stock_name/compare
     */

    controller.compararAcoes = async (req, res) => {
        try {
            let { stock_name } = req.params;
            let { stocks } = req.body;

            if (!Array.isArray(stocks)) {
                return res.status(400).json({
                    erro: "stocks precisa ser um array"
                });
            }

            let data = { lastPrices: [] };

            if (stocks[0] !== stock_name) {
                await stocks.splice(0, 0, stock_name);
            }

            for (let i = 0; i < stocks.length; i++) {
                let resposta = await fetch(`${urlApi}/query?function=GLOBAL_QUOTE&symbol=${stocks[i]}&apikey=${apiKey}`);
                if (resposta.status == 200) {
                    resposta = await resposta.json()
                    if (resposta['Global Quote']) {
                        data.lastPrices.push({
                            name: stocks[i],
                            lastPrice: parseFloat(resposta['Global Quote']["05. price"]),
                            pricedAt: resposta['Global Quote']["07. latest trading day"]
                        });
                    } else {
                        return res.status(400).json({
                            erro: "Erro ao comparar as ações, tente novamente."
                        });
                    }
                } else {
                    return res.status(502).json({
                        erro: 'Erro ao consultar a api da alpha vantage'
                    });
                }
            }
            for (let i = 0; i < data.lastPrices.length; i++) {
                if (!data.lastPrices[i].pricedAt) {
                    return res.status(400).json({
                        erro: `Erro ao consultar o histórico de preços da ação: ${stock_name}, por esse motivo não foi possivel trazer as comparações.`,
                    });
                }
            }
            return res.status(200).json(data);
        } catch (error) {
            console.log("app - controllers - apiRequest - compararAcoes: ", error);
            return res.status(500)
        }
    }

    /**
    * projetarGanhos
    * @param {Object} req
    * @param {Object} res
    * @method GET
    * @route /stocks/:stock_name/gains
    */

    controller.projetarGanhos = async (req, res) => {
        try {
            let { stock_name } = req.params;
            let { purchasedAmount, purchasedAt } = req.query;

            if (!purchasedAmount || purchasedAmount == null || purchasedAmount == "" || !purchasedAt || purchasedAt == null || purchasedAt == "") {
                return res.status(400).json({
                    erro: "Falta parâmetros na query, purchasedAmount e purchasedAt são obrigatórios."
                });
            }
            if (purchasedAmount <= 0) {
                return res.status(400).json({
                    erro: "A data da compra precisa ser maior que zero"
                });
            }
            let now = new Date();
            now = `${now.getFullYear()}-${now.getDate()}-${now.getMonth()}`
            if (purchasedAt > now) {
                return res.status(400).json({
                    erro: "A data da compra precisa ser maior que a data de hoje"
                });
            }
            let resposta = await fetch(`${urlApi}/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=${apiKey}`);
            if (resposta.status == 200) {
                resposta = await resposta.json();

                if (resposta['Time Series (Daily)']) {
                    let dados = resposta['Time Series (Daily)'];
                    let dataCompra = dados[purchasedAt]
                    let precoCompra = parseFloat(dataCompra['4. close'])
                    let atual = dados[Object.keys(dados)[0]]
                    let ultimoValor = parseFloat(atual['4. close'])

                    let data = {
                        name: stock_name,
                        purchasedAmount: purchasedAmount,
                        purchasedAt: purchasedAt,
                        priceAtDate: precoCompra,
                        lastPrice: ultimoValor,
                        capitalGains: parseFloat((ultimoValor - precoCompra) * purchasedAmount).toFixed(2)
                    }
                    return res.status(200).json(data);
                } else {
                    return res.status(400).json({
                        erro: `Erro ao projetar ganhos para a ação: ${stock_name}`
                    });
                }
            } else {
                return res.status(502).json({
                    erro: 'Erro ao consultar a api da alpha vantage'
                });
            }
        } catch (error) {
            console.log("app - controllers - apiRequest - projetarGanhos: ", error);
            return res.status(500)
        }
    }
    return controller
}