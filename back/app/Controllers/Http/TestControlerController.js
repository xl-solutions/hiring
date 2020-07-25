'use strict'

const Env = use('Env');
const axios = use('axios');

class TestControlerController {

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

    async search({request, response}) {
        const search = request.get().search;

        await axios.get(Env.get('ALPHAVANTAGE_URL'), {
            params: {
                'apikey': Env.get('ALPHAVANTAGE_KEY'),
                'function': 'SYMBOL_SEARCH',
                'keywords': search,
            }
        }).then(({data}) => {
            return response.send(data.bestMatches.map((element) => {
                return {
                    'initials': element['1. symbol'],
                    'name': element['2. name'],
                };
            }));
        }).catch(() => {
            console.log('DEU RUIM');
        });
    } 
}

module.exports = TestControlerController
