'use strict'

const Env = use('Env');
const axios = use('axios');

const b3 = [
    'AZUL4',
    'ABEV3',
    'BTOW3',
    'B3SA3',
    'BBSE3',
    'VRML3',
    'BBDC4',
    'BBDC3',
    'BRAP4',
    'BBAS3',
    'BRKM5',
    'BRFS3',
    'CCRO3',
    'CMIG4',
    'CIEL3',
    'CSAN3',
    'CVCB3',
    'CYRE3',
    'ECOR3',
    'ELET3',
    'ELET6',
    'EMBR3',
    'ENBR3',
    'ENGIE3',
    'EQTL3',
    'YDUQ3',
    'FLRY3',
    'GGBR4',
    'GOAU4',
    'GOLL4',
    'HYPE3',
    'IGTA3',
    'IRBR3',
    'ITSA4',
    'ITUB4',
    'JBSS3',
    'KLBN11',
    'KROT3',
    'RENT3',
    'LAME4',
    'LREN3',
    'MGLU3',
    'MRFG3',
    'MRVE3',
    'MULT3',
    'NATU3',
    'PCAR4',
    'PETR4',
    'PETR3',
    'BRDT3',
    'QUAL3',
    'RADL3',
    'RAIL3',
    'SBSP3',
    'SANB11',
    'CSNA3',
    'SMLS3',
    'SUZB5',
    'TAEE11',
    'VIVT4',
    'TIMP3',
    'UGPA3',
    'USIM5',
    'VALE3',
    'VVAR3',
    'WEGE3',
];

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
            console.log('DEU RUIM');        });
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
}

module.exports = TestControlerController
