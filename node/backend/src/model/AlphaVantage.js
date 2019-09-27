/* Classe para consultar a API alphavantage */
const axios = require("axios");

const Alpha = {

    endpoint: "https://www.alphavantage.co/query",
    apiKey: "IT5RE2ONKL4COHW3",
        
    quote: async function(name){
        const params = {
            "function": "TIME_SERIES_INTRADAY",
            "symbol": name,
            "interval": "1min",
            "apikey": this.apiKey
            
        };
        const response = await axios.get(this.endpoint,{params});         
        if(typeof response.data["Time Series (1min)"] !== "undefined"){
            const timeSeries = Object.entries(response.data["Time Series (1min)"])[0];         
            return {date: new Date(timeSeries[0]),value:parseFloat(timeSeries[1]['4. close'])};        
        }else{
            return {date:null,value:null};        
        }
    },

    historyDay: async function(name,from,to){
        const params = {
            "function": "TIME_SERIES_DAILY",
            "symbol": name,          
            "outputsize": "full",
            "apikey": this.apiKey            
        };
        const response = await axios.get(this.endpoint,{params}); 
        if(typeof response.data["Time Series (Daily)"] !== "undefined"){
            return Object.entries(response.data["Time Series (Daily)"]);
        }else{
            return undefined;
        }       
    },
    
}

module.exports = Alpha;