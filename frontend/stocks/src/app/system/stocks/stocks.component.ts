import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../shared/services/stocks.service';
import IStock from '../../shared/interfaces/stock.interface';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit {
  public stockName: string = '';
  public stock: IStock;

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {}

  async getStock() {
    console.log(this.stockName);

    const result = await this.stocksService.getStockByName(this.stockName);
    this.stock = result;
    console.log(result);
  }
}
