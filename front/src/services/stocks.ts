import { api } from "./api";

export interface IGetHistoryResponse {
  name: string;
  lastPrice: number;
  pricedAt: Date | string;
  prices: Array<IStockPriceHistory>;
  erro?: string;
  gains?: IStockGains;
}

export interface IStockPriceHistory {
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string;
}

export interface IStockGains {
  capitalGains: number;
  purchasedAmount: number;
  purchasedAt: string;
}

export async function getStock(stockName: string) {
  try {
    let response = null;
    if (stockName === "") {
      return "O nome do ativo deve ser informado.";
    }
    const { data } = await api.get(`/${stockName}/quote`);

    if (data) {
      response = data;
    }

    return response;
  } catch (error: any) {
    return error.toString();
  }
}

export async function getHistory(stockName: string, fromDate: string, toDate: string) {
  try {
    let response = null;

    if (stockName === "" || fromDate === "" || toDate === "") {
      return "Foram fornecidas informações insuficientes para realizar a requisição.";
    }

    const { data } = await api.get(`/${stockName}/history?from=${fromDate}&to=${toDate}`);

    if (data) {
      response = data;
    }
    console.log(data);
    return response;
  } catch (error: any) {
    return error.toString();
  }
}

export async function getComparison(stockName: string, stocks: Array<string>) {
  try {
    let response = null;

    if (stockName === "" || stocks.length === 0) {
      return "Foram fornecidas informações insuficientes para realizar a requisição.";
    }

    const { data } = await api.get(`/${stockName}`, { data: { stocks: stocks } });

    if (data) {
      response = data;
    }

    return response;
  } catch (error: any) {
    return error.toString();
  }
}

export async function getGains(stockName: string, purchasedAmount: number, purchasedAt: string) {
  try {
    let response = null;
    if (stockName === "" || purchasedAmount < 100 || purchasedAt === "") {
      return "Foram fornecidas informações insuficientes para realizar a requisição.";
    }

    const { data } = await api.get(`/${stockName}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${purchasedAt}`);

    if (data) {
      response = data;
    }

    return response;
  } catch (error: any) {
    return error.toString();
  }
}
