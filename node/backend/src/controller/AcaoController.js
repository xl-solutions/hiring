const Acao = require("../model/Acao");

module.exports = {   
    async quote(req,res){
        const {stock_name} = req.params; 
        const acao = await Acao.quote(stock_name);       
        const retorno = {
            name: stock_name,
            lastPrice: acao.value,
            pricedAt: acao.date
        }               
        return res.json(retorno);
    },

    async history(req,res){
        const {stock_name} = req.params; 
        const {from,to} = req.query;
        const acao = await Acao.history(stock_name,from,to);
        if(typeof acao !== "undefined"){
            return res.json(acao);
        }else{
            return res.status(404).json({error:"Não foi possível buscar o histórico"});
        }        
    },

    async compare(req,res){        
        const {stock_name} = req.params; 
        let stocks = [stock_name, ...req.body.stocks];        
        const retorno = await Promise.all(stocks.map(async(value) =>{
            const acao = await Acao.quote(value);              
            return {
                name: value,               
                lastPrice: acao.value,
                pricedAt: acao.date               
            }                      
        }));

        return res.json({lastPrices:retorno});     
    },

    async gains(req,res){
        const {stock_name} = req.params; 
        const {purchasedAmount,purchasedAt} = req.query;

        const acaoAntiga = await Acao.history(stock_name,purchasedAt,purchasedAt);
        const acaoNova = await Acao.quote(stock_name);           
        if(typeof acaoAntiga[0] !== "undefined"){
            const compraTotal = purchasedAmount * acaoAntiga[0].closing;
            const vendaTotal = purchasedAmount * acaoNova.value; 
            const gain = (vendaTotal - compraTotal).toFixed(2);
            const retorno = {
                "name": stock_name,
                "purchasedAmount": parseInt(purchasedAmount),
                "purchasedAt": purchasedAt, 
                "priceAtDate": acaoAntiga[0].closing, 
                "lastPrice": acaoNova.value,   
                "capitalGains": parseFloat(gain)
            };
            return res.json(retorno);
        }else{
            return res.status(404).json({error:"Erro ao analisar ações."});
        }
        
         
    }
}
