const HttpException = require('../utils/HttpException.utils');
const axios = require('axios');

class Requests {
    ///////////////////////
    /*           Routes */
    ///////////////////////
    search({stock_name}){
        
        let uri= `/query?`
        uri+= `function=SYMBOL_SEARCH&`
        uri+= `keywords=${stock_name}&`
        uri+= `apikey=${process.env.ALPHA_API_KEY}`;

        const search = new Promise((resolve , reject) => {
            axios.get(process.env.FINANCE_API + uri)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject('Error: ', err.message);
            });
        });
        return search
    }

    recent({stock_name, interval= "1min"}){
        
        let uri= `/query?`
        uri+= `function=TIME_SERIES_INTRADAY&`
        uri+= `symbol=${stock_name}&`
        uri+= `interval=${interval}&`
        uri+= `apikey=${process.env.ALPHA_API_KEY}`;

        const recent = new Promise((resolve , reject) => {
            axios.get(process.env.FINANCE_API + uri)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject('Error: ', err.message);
            });
        });
        return recent
    }

    getHistPrice({
        stock_name, 
        interval= "30min",
        slice= "year1month1",
        from, 
        to,
    }){
        //convertPeriod(from, to) /// TODO

        let uri= `/query?`
        uri+= `function=TIME_SERIES_INTRADAY_EXTENDED&`
        uri+= `symbol=${stock_name}&`
        uri+= `interval=${interval}&`
        uri+= `slice=${slice}&`
        uri+= `apikey=${process.env.ALPHA_API_KEY}`;

        const recent = new Promise((resolve , reject) => {
            axios.get(process.env.FINANCE_API + uri)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject('Error: ', err.message);
            });
        });
        return recent
    }


}

module.exports = new Requests;