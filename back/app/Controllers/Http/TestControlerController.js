'use strict'

const Env = use('Env');
const axios = use('axios');

class TestControlerController {

    async quote({request, response}) {
        const stockName = request.params.stock_name;
        let stock = {};

        await axios.get(Env.get('ALPHAVANTAGE_URL'), {
            params: {
                'apikey': Env.get('ALPHAVANTAGE_KEY'),
                'function': 'GLOBAL_QUOTE',
                'symbol': stockName,
            }
        }).then(({data}) => {
            const temp = data['Global Quote'];

            stock = {
                name: temp['01. symbol'],
                lastPrice: temp['01. symbol'],
                pricedAt: temp['05. price']
            };
        });

        return response.send(stock);
    }

    async history({request, response}) {
        const stockName = request.params.stock_name;
        const from = new Date(request.get().from);
        const to = new Date(request.get().to);
        let history = [];

        await axios.get(Env.get('ALPHAVANTAGE_URL'), {
            params: {
                'function': 'TIME_SERIES_DAILY',
                'apikey': Env.get('ALPHAVANTAGE_KEY'),
                'symbol': stockName,
                'outputsize': 'Compact'
            }
        }).then(({ data }) => {   
            const tmp = data['Time Series (Daily)'];

            const daysSelected = Object.keys(tmp).filter(day => {
                const date = new Date(day);
                
                return from <= date && date <= to;
            });

            daysSelected.forEach(element => {
                let sub = tmp[element];

                history.push({
                     opening: sub['1. open'],
                     low: sub['3. low'],
                     high: sub['2. high'],
                     closing: sub['4. close'],
                     pricedAt: element
                 });
            });
        });

        return response.send(history);
    }
    
    async compare({request, response}) {
        const stockPrimary = request.params.stock_name;
        const stocks = request.body.stocks;
        let stocksArrray = Object.values(stocks);
        let result = [];

        stocksArrray.push(stockPrimary);

        for (let i = 0; i < stocksArrray.length; i++) {
            await axios.get(Env.get('ALPHAVANTAGE_URL'), {
                params: {
                    'apikey': Env.get('ALPHAVANTAGE_KEY'),
                    'function': 'GLOBAL_QUOTE',
                    'symbol': stocksArrray[i],
                },

                timeout: 300000,

            }).then(({data}) => {
                const temp = data['Global Quote'];

                result.push({
                    name: temp['01. symbol'],
                    lastPrice: temp['01. symbol'],
                    pricedAt: temp['05. price']
                });
            });            
        }

        return response.send(result);
    }

    async gains({request, response}) {
        const stock = request.params.stock_name;
        const purchasedAmount = parseInt(request.all().purchasedAmount);
        const purchasedAt = request.all().purchasedAt;
        let result = null;

        await axios.get(Env.get('ALPHAVANTAGE_URL'), {
            params: {
                'function': 'TIME_SERIES_DAILY',
                'apikey': Env.get('ALPHAVANTAGE_KEY'),
                'symbol': stock,
                'outputsize': 'full'
            },
            timeout: 300000,
        }).then(({ data }) => {
            const tmp = data['Time Series (Daily)'];
            const days = Object.keys(tmp);

            const day = days.find(element => element <= purchasedAt);
            const valuesInDay = tmp[day];

            const average = (parseFloat(valuesInDay['2. high']) + parseFloat(valuesInDay['3. low']))/2;

            const lastDay = days.shift();
            const lastValues = tmp[lastDay];
            const lastValue = parseFloat(lastValues['4. close']);

            const gains = (lastValue * purchasedAmount) - (average * purchasedAmount);

            result = {
                name: stock,
                purchasedAmount: purchasedAmount,
                purchasedAt: purchasedAt,
                priceAtDate: average,
                lastPrice: lastValue,
                capitalGains: gains, // ganhos ou perdas com a ação, em reais
            };
        });

        return response.send(result);
    }

    async search({request, response}) {
        const keyword = request.all().keyword;
        let result =  [];

        await axios.get(Env.get('ALPHAVANTAGE_URL'), {
            params: {
                'apikey': Env.get('ALPHAVANTAGE_KEY'),
                'function': 'SYMBOL_SEARCH',
                'keywords': keyword,
            }
        }).then(({data}) => {
            let tmp = data['bestMatches'];

            tmp.forEach(element => {

                result.push({
                    initials: element['1. symbol'],
                    name: element['2. name'],
                })
            });
        });

        return response.send(result);
    }
}

module.exports = TestControlerController
