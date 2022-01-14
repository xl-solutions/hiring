const api = require('../services/api')

async function getStocks(req, res) {
    try {
        const { stock_name } = req.params

        if (!stock_name || stock_name == "") {
            return res.status(400).send('Invalid stock name or stock name is required')
        }

        const { data } = await api.get(`/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${process.env.API_KEY}`)
        
        
        if (!data || Object.values(data["Global Quote"]).length === 0)  {
            
            return res.status(404).send('Stock not found')
        }

        const stock = {
            name: stock_name,
            lastPrice: parseFloat(data['Global Quote']['05. price']),
            pricedAt: data['Global Quote']['07. latest trading day'],
        }


        return res.status(200).send(stock);
        } catch (error) {
            return res.status(400).send({ erro: error.toString() })
        }
}

async function getHistoryStock(req, res) {
    try {
        const { stock_name } = req.params
        const { to, from } = req.query

        
        if (!stock_name) {
            return res.status(400).send('Invalid stock name or stock name is required')
        }
        
        if (!to || !from) {
            return res.status(400).send('Invalid date or date is required')
        }
        
        const toSplit = to.split('-')
        
        const fromSplit = from.split('-')
        
        
        //if from to format is invalid return error
        if(toSplit.length !== 3 || toSplit['0'].length !== 4 || toSplit['1'].length !== 2 || toSplit['2'].length !== 2) {
            return res.status(400).send('Invalid date format! Please send a correct date format: YYYY-MM-DD')
        }
        
        //if from are format is invalid return error
        if(fromSplit.length !== 3 || fromSplit['0'].length !== 4 || fromSplit['1'].length !== 2 || fromSplit['2'].length !== 2) {
            return res.status(400).send('Invalid date format! Please send a correct date format: YYYY-MM-DD')
        }
        
        // if a date to is > from return error
        if(new Date(from) > new Date(to)) {
            return res.status(400).send('Invalid date! Please send init date less than final date')
        }
        
        const { data } = await api.get(`/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=${process.env.API_KEY}`)
        
        
        if (!data) {
            return res.status(404).send('Stock not found')
        }

        if (data.Note) {
            return res.status(400).send({ erro: `limit of API for minute` });
        }
        
        const Keys = Object.keys(data['Time Series (Daily)'])

        const StockHistory = {
            name: stock_name,
            prices: []
        }

        let last = "";

        let first = Keys.indexOf(from) === -1 ? 0 : Keys.indexOf(from)

        for (let i = first; last !== to && i !== 0; i--) {
            if (data["Time Series (Daily)"][Keys[i]]) {
                StockHistory.prices.push({
                    opening: parseFloat(data["Time Series (Daily)"][Keys[i]]["1. open"]),
                    low: parseFloat(data["Time Series (Daily)"][Keys[i]]["3. low"]),
                    high: parseFloat(data["Time Series (Daily)"][Keys[i]]["2. high"]),
                    closing: parseFloat(data["Time Series (Daily)"][Keys[i]]["4. close"]),
                    pricedAt: Keys[i]
                });
                last = Keys[i]
            }
        }

        return res.status(200).send(StockHistory)

        } catch (error) {
            return res.status(400).send({ erro: error.toString() })
        }
}

// compare a stock with another stock
async function getComparisonStock(req, res) {
    try {
        const { stock_name, stocks } = req.params

        let lastPrices = []

        if (!stock_name || !stocks) {
            return res.status(400).send('Invalid stock name or more stock name is required')
        }

        if (stock_name === "" || stocks.length == 0) {
            return res.status(400).send('supply at least one stock to compare')
        }
        let arr_stocks = []
        // add a stock_name to the array of stocks to compare
        arr_stocks.push(stock_name, stocks);

        
        // get the last price of each stock
        for (stock in arr_stocks) {
            const { data } = await api.get(`/query?function=GLOBAL_QUOTE&symbol=${stocks[stock]}&apikey=${process.env.API_KEY}`)

            if (!data) {
                return res.status(404).send('Stock not found')
            } 

            if (Object.keys(data['Global Quote']).length === 0) {
                return res.status(404).send('Stock not found')
            }

            if (data.Note) {
                return res.status(400).send({ erro: `limit of API for minute` });
            }

            lastPrices.push({
                name: arr_stocks[stock],
                lastPrice: parseFloat(data['Global Quote']['05. price']),
                pricedAt: data['Global Quote']['07. latest trading day'],
            });
        }

        return res.status(200).send(lastPrices)
    
    } catch (error) {
        return res.status(400).send({ erro: error.toString() })
    }
}
// May return gains since a date
async function getProjectionStock (req, res) {
    try {
        let { purchasedAt, purchasedAmount } = req.query
        const { stock_name } = req.params

        purchasedAmount = parseInt(purchasedAmount)

        if (!stock_name || !purchasedAt || !purchasedAmount) {
            return res.status(400).send('Missing parameters')
        }

        if (purchasedAmount < 0) {
            return res.status(400).send('Invalid amount')
        }

        const purchasedAtSplit = purchasedAt.split('-')

        if(purchasedAtSplit.length !== 3 || purchasedAtSplit['0'].length !== 4 || purchasedAtSplit['1'].length !== 2 || purchasedAtSplit['2'].length !== 2) {
            return res.status(400).send('Invalid date format! Please send a correct date format: YYYY-MM-DD')
        }

        const { data } = await api.get(`/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=${process.env.API_KEY}`)

        if (!data) {
            return res.status(404).send('Stock not found')
        }

        const StockPrices = data['Time Series (Daily)']

        if (StockPrices[purchasedAt] === undefined) {
            return res.status(404).send('date of purchase not found')
        }
        console.log(StockPrices[purchasedAt])

        const purchased = StockPrices[purchasedAt]
        let now = StockPrices[Object.keys(StockPrices)[0]]
        let pricePurchased = parseFloat(purchased['4. close'])
        let priceNow = parseFloat(now['4. close'])


        const gainsResponse = {
            name: stock_name,
            purchasedAmount,
            purchasedAt,
            pricePurchased,
            priceNow,
            gains: parseFloat((priceNow - pricePurchased) * purchasedAmount).toFixed(2)
        }

        return res.status(200).send(gainsResponse)
        
    } catch (error) {
        return res.status(400).send({ erro: error.toString() })
    }
}




module.exports = { getStocks, getHistoryStock, getComparisonStock,  getProjectionStock };