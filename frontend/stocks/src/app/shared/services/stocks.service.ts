import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import IStock from '../interfaces/stock.interface';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  url: any = '';

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}`;
  }

  getStockByName(name: string) {
    const url = `${this.url}/stocks/${name}/quote`;
    return this.http.get<IStock>(url).toPromise()
  }

  getStockHistory(name:string, date1:string, date2: string){
    const url = `${this.url}/stocks/${name}/history`
    return this.http.get(url, {
      params:{
        date1:'',
        date2:'',
      }
    }).toPromise()
  }
}
