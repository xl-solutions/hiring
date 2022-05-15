

interface IStocksRepositoryRequest {
    findByRecentQuotes(stock_name: string):any;
    findByHistoricPrices(stock_name:string, from:string, to:string):any;
    compareStocks(stocks: string[]): any;
    findByProjectGains(stock_name:string, purchasedAmount:number, purchasedAt:string): any;
}

export { IStocksRepositoryRequest };