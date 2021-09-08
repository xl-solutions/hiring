import { api } from "./api";

export interface IGetStockResponseInterface {
  name: string;
  lastPrice: number;
  pricedAt: Date | string;
}

export async function getStock(stockName: string): Promise<IGetStockResponseInterface | string | undefined> {
  try {
    let response = null;
    if (stockName === "") {
      return;
    }
    const { data } = await api.get(`/${stockName}/quote`);

    if (data) {
      response = data;
    }

    return response;
  } catch (error: any) {
    return error?.response?.data?.erro ?? error.toString();
  }
}
