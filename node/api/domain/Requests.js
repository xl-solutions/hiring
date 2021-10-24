const HttpException = require('../utils/HttpException.utils');
const axios = require('axios');
var eachDayOfInterval = require('date-fns/eachDayOfInterval')

const customFilter = (object, key) => {
    if (Array.isArray(object)) {
      for (const obj of object) {
        const result = customFilter(obj, key);
        if (result) {
          return obj;
        }
      }
    } else {
      if (object.hasOwnProperty(key)) {
        return object;
      }
  
      for (const k of Object.keys(object)) {
        if (typeof object[k] === "object") {
          const o = customFilter(object[k], key);
          if (o !== null && typeof o !== 'undefined')
            return o;
        }
      }
  
      return null;
    }
}

const convertToIso = (dates) =>{
    return dates.map(e => {
        let date= new Date(e)
        return date.toISOString().split("T")[0];
    });
}

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

    recent({stock_name}){
        
        let uri= `/query?`
        uri+= `function=TIME_SERIES_INTRADAY&`
        uri+= `symbol=${stock_name}&`
        uri+= `interval=1min&`
        uri+= `apikey=${process.env.ALPHA_API_KEY}`;
        
        const recent = new Promise((resolve , reject) => {
            axios.get(process.env.FINANCE_API + uri)
            .then(res => {
                let data = res.data
                let stockName = data["Meta Data"]["2. Symbol"]
                let lastRefreshed = data["Meta Data"]["3. Last Refreshed"]
                let obj = customFilter(data, lastRefreshed)
                let returObj= {
                    name: stockName,
                    lastPrice: obj[lastRefreshed]["4. close"], 
                    pricedAt: lastRefreshed
                }
                resolve(returObj);
            })
            .catch(err => {
                reject('Stock exists?');
            });
        });
        return recent
    }

    getHistPrice(req){
        const { stock_name } = req.params
        const {  
            from, 
            to
        } = req.query

        let uri= `/query?`
        uri+= `function=TIME_SERIES_DAILY&`
        uri+= `symbol=${stock_name}&`
        uri+= `outputsize=compact&` // change to full for more historiacl 
        uri+= `apikey=${process.env.ALPHA_API_KEY}`;

        let fromS= from.split("-").map( e => parseInt(e))
        let toS= to.split("-").map( e => parseInt(e))
        
        let dates = eachDayOfInterval(
            { start: new Date(fromS[0],fromS[1], fromS[2]), 
              end: new Date(toS[0],toS[1], toS[2]) }
        )

        let convertedDates= convertToIso(dates)
        
        const recent = new Promise((resolve , reject) => {
            axios.get(process.env.FINANCE_API + uri)
            .then(res => {
                let data = res.data
                let stockName = data["Meta Data"]["2. Symbol"]  
                let timeSeries= data["Time Series (Daily)"]
                
                
                let formatedOutput= {
                    "opening": "",
                    "low": "",
                    "high": "",
                    "closing": "",
                    "pricedAt": "" 
                }

                let values= convertedDates.map( e => {
                    let selectedDates= timeSeries[e]; 
                    
                    formatedOutput= {
                        "opening": selectedDates["1. open"],
                        "low": selectedDates["3. low"],
                        "high": selectedDates["2. high"],
                        "closing": selectedDates["4. close"],
                        "pricedAt": e
                    }
                    return formatedOutput
                })

                resolve(values);
            })
            .catch(err => {
                reject('Error: ', err.message);
            });
        });
        return recent
    }

    compare(req){
        const {
            stocks,
        } = req.body
        const {
            stock_name,
        } = req.params
       
        const allStocks= [...stocks, stock_name]
        
        const stocksPromises= allStocks.map( stock => {return this.recent({stock_name: stock})})

        return Promise.all(stocksPromises)
            .then((lastPrices) => {
                return {"lastPrices": lastPrices}
        });
    }


}

module.exports = new Requests;