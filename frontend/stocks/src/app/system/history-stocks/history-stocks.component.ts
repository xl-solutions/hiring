import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../shared/services/stocks.service';


@Component({
  selector: 'app-history-stocks',
  templateUrl: './history-stocks.component.html',
  styleUrls: ['./history-stocks.component.css']
})
export class HistoryStocksComponent implements OnInit {
  public stockName: string = '';
  public date1:string = ''
  public date2:string = ''

  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
  }

  async getHistory(){

    const result = await this.stocksService.getStockHistory(this.stockName, this.date1, this.date2)

  }

}
