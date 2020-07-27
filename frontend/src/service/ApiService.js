import { ConfigClass } from '../classes/ConfigClass'

let caminho = ConfigClass.getUrlApi().toString();
const fetch = require("node-fetch");

export default class ApiService {
    constructor() {
    }

    static getPrecoAtual(stock_name) {
        return fetch(`${caminho}/stocks/${stock_name}/quote`).then(response => {
            return response.json();
        })
    }

    static getPrecoHistorico(stock_name, from, to) {
        return fetch(`${caminho}/stocks/${stock_name}/history?from=${from}&to=${to}`).then(response => {
            return response.json();
        })
    }

    static compararAcoes(dados, stock_name) {
        return fetch(`${caminho}/stocks/${stock_name}/compare`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({stocks: dados})
            }
        ).then(response => {
            return response.json();
        })
    }

    static getProjetarGanhos(stock_name, purchasedAmount, purchasedAt) {
        return fetch(`${caminho}/stocks/${stock_name}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${purchasedAt}`).then(response => {
            return response.json();
        })
    }
}