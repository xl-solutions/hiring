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

    async index({request}) {

        await axios.get(Env.get('ALPHAVANTAGE_URL'), {
            params: {
                'function': 'TIME_SERIES_DAILY',
                'apikey': Env.get('ALPHAVANTAGE_KEY'),
                'symbol': 'VVAR3.SAO',
                'outputsize': 'full'
            }
        }).then((response) => {
            console.log(response);
        });
    }

    async value({request, response}) {
        const name = request.get().name;

        await axios.get(Env.get('ALPHAVANTAGE_URL'), {
            params: {
                'apikey': Env.get('ALPHAVANTAGE_KEY'),
                'function': 'GLOBAL_QUOTE',
                'symbol': name,
            }
        }).then(({data}) => {
            const action = data['Global Quote'];

            return response.send(action['05. price']);
        }).catch(() => {
            console.log('DEU RUIM');
        });
    }

    async values({request, response}) {
        const sao = '.SAO';
        const nameRemove = request.get().name;
        const nameWithoutSao = nameRemove.replace(sao, '');
        let res = [];

        const newB3 = b3.filter((element) => {
            return element != nameWithoutSao;
        });

        newB3.forEach(element => {
            let value = 0.00;

            axios.get(Env.get('ALPHAVANTAGE_URL'), {
                params: {
                    'apikey': Env.get('ALPHAVANTAGE_KEY'),
                    'function': 'GLOBAL_QUOTE',
                    'symbol': element.concat(sao),
                }
            }).then(({data}) => {
                const action = data['Global Quote'];

                value = action['05. price'];
            }).catch(() => {});

            res.push({
                name: element,
                value: value
            });
        });

        return response.send(res);
    }

    async historic({request, response}) {
        const name = request.get().name;

        return response.send('AQUI');
    }
}

module.exports = TestControlerController
