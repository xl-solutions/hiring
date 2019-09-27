const Alpha = require("../model/AlphaVantage");
const Acao = {
    quote: function(name){
        return Alpha.quote(name);
    },
    history: async function(name,from,to){     
            
        const resultado = await Alpha.historyDay(name,from,to);            
               
        const fromDate = new Date(from).getTime();
        const toDate = new Date(to).getTime();         
        if(typeof resultado !== "undefined"){
            let retorno = [];
            resultado.forEach(function(item){          
                let date = new Date(item[0]);                
                const pricing = {                
                    "opening": parseFloat(item[1]['1. open']),
                    "low": parseFloat(item[1]['3. low']),
                    "high": parseFloat(item[1]['2. high']),
                    "closing": parseFloat(item[1]['4. close']),
                    "pricedAt": date
                }
                if(date.getTime() >= fromDate && date.getTime() <= toDate){
                    retorno.push(pricing);           
                }
            });
            return retorno;
        }else{
            return undefined;
        }        
    },
    
}

module.exports = Acao;