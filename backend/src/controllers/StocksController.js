const api = require('../services/api');

module.exports = {
    async quote(req, res) {
        try {
            const { stock_name } = req.params;
            const response = await api.get('/query', {
                params: {
                    function: 'TIME_SERIES_MONTHLY',
                    symbol: stock_name,
                    apikey: process.env.API_KEY,
                },
            });
            
            const data = response.data;
            if (data['Error Message']) {
                return res.status(404).json({ message: 'As ações dessa empresa não foram encontradas' });
            }
            
            const name = data['Meta Data']['2. Symbol'];
            const lastDate = data['Meta Data']['3. Last Refreshed'];
            const lastPrice = +data['Monthly Time Series'][lastDate]['4. close'];
            const pricedAt = new Date(lastDate).toISOString();
            
            return res.status(200).json({ name, lastPrice, pricedAt });
        } catch (err) {
            res.send(err);
        }        
    },
    
    async history(req, res) {
        try {
            const stockName = req.params.stock_name;
            const from = new Date(req.query.from);
            const to = new Date(req.query.to);
            
            const response = await api.get('/query', {
                params: {
                    function: 'TIME_SERIES_MONTHLY',
                    symbol: stockName,
                    apikey: process.env.API_KEY,
                },
            });
            
            const data = response.data;
            
            if (data['Error Message']) {
                return res
                .status(404)
                .json({ message: 'As ações dessa empresa não foram encontradas' });
            }
            
            const prices = [];
            const stockList = Object.keys(data['Monthly Time Series']);
            
            const filteredStockList = stockList.filter((month) => {
                const stockDate = new Date(month).getTime();
                return stockDate >= from.getTime() && stockDate <= to.getTime();
            });
            
            if (filteredStockList.length) {
                for (let key of filteredStockList) {
                    const currentAction = data['Monthly Time Series'][key];
                    const stock = {
                        opening: +currentAction['1. open'],
                        low: +currentAction['2. high'],
                        high: +currentAction['3. low'],
                        closing: +currentAction['4. close'],
                        pricedAt: new Date(key).toISOString(),
                    };
                    prices.push(stock);
                }
                
                return res.status(200).json({
                    name: stockName,
                    prices,
                });
            }
            
            return res.status(200).json({
                message: 'Não foi encontrada nenhuma ação nesse intervalo de datas.',
            });
        } catch (err) {
            res.send(err);
        }
    },
    
    async gains(req, res) {
        const stockName = req.params.stock_name;
        const purchasedAmount = +req.query.purchasedAmount;
        const purchasedAt = req.query.purchasedAt;
        const errors = [];
        
        try {
            const response = await api.get('/query', {
                params: {
                    function: 'TIME_SERIES_MONTHLY',
                    symbol: stockName,
                    apikey: process.env.API_KEY,
                },
            });
            
            const data = response.data;
            
            if (data['Error Message']) {
                errors.push({
                    message: `As ações da empresa ${stockName} não foram encontradas`,
                });
            }
            
            const validDates = Object.keys(data['Monthly Time Series']);
            
            if (validDates.indexOf(purchasedAt) !== -1) {
                const lastDate = data['Meta Data']['3. Last Refreshed'];
                const priceAtDate = +data['Monthly Time Series'][purchasedAt]['4. close'];
                const lastPrice = +data['Monthly Time Series'][lastDate]['4. close'];
                const oldGains = purchasedAmount * priceAtDate;
                const actualGains = purchasedAmount * lastPrice;
                const capitalGains = actualGains - oldGains;
                
                return res.status(200).json({
                    name: stockName,
                    purchasedAmount,
                    purchasedAt: new Date(purchasedAt).toISOString(),
                    priceAtDate,
                    lastPrice,
                    capitalGains,
                });
            }
            
            errors.push({ message: 'Não foram encontradas ações nesta data' });
        } catch (err) {
            errors.push(err);
        }
        
        if (errors.length) {
            return res.status(404).send({ errors });
        }
    },
    
    async compare(req, res) {
        const stocks = [...req.body.stocks, req.params.stock_name];
        const lastPrices = [];
        const errors = [];
        
        for (let stock of stocks) {
            try {
                const response = await api.get('/query', {
                    params: {
                        function: 'TIME_SERIES_MONTHLY',
                        symbol: stock,
                        apikey: process.env.API_KEY,
                    },
                });
                
                const data = response.data;
                
                if (data['Error Message']) {
                    errors.push(`As ações da empresa ${stock} não foram encontradas`);
                }
                
                const lastDate = data['Meta Data']['3. Last Refreshed'];
                const lastPrice = +data['Monthly Time Series'][lastDate]['4. close'];
                const pricedAt = new Date(lastDate).toISOString();
                
                lastPrices.push({
                    name: stock,
                    lastPrice,
                    pricedAt,
                });
            } catch (err) {
                errors.push(err);
            }
        }
        
        if (errors.length) {
            return res.send({ errors });
        }
        
        return res.status(200).json(lastPrices);
    },
}