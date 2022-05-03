import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import IStock from '../interfaces/stock.interface';
import IStockHistory from '../interfaces/stock-history.interface';
import IGains from '../interfaces/gains.interface';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  url: any = '';

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}`;
  }

  addToPortfolio(stock: IStock) {
    const url = `${this.url}/stocks/add`;
    return this.http.post<IStock>(url, stock).toPromise();
  }

  getPortfolio() {
    const url = `${this.url}/stocks/my`;
    return this.http.get<IStock[]>(url).toPromise();
  }

  getStockByName(name: string) {
    const url = `${this.url}/stocks/${name}/quote`;
    return this.http.get<IStock>(url).toPromise();
  }

  getStockHistory(name: string, from: string, to: string) {
    const url = `${this.url}/stocks/${name}/history`;
    return this.http
      .get<IStockHistory>(url, {
        params: {
          from,
          to,
        },
      })
      .toPromise();
  }

  stocksComparation(name: string, stocksList: any) {
    const url = `${this.url}/stocks/${name}/compare`;
    return this.http.post<IStock>(url, stocksList).toPromise()
  }

  getEarningsProjection(
    name: string,
    purchasedAmount: string,
    purchasedAt: string
  ) {
    const url = `${this.url}/stocks/${name}/gains`;
    return this.http.get<IGains>(url, {
      params: {
        purchasedAmount,
        purchasedAt,
      },
    });
  }
}
