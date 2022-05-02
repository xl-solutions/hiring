import { Component, OnInit } from '@angular/core';
import IStock from 'src/app/shared/interfaces/stock.interface';
import { StocksService } from 'src/app/shared/services/stocks.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  public stocks: IStock[];

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
    this.getStocks()
  }

  async getStocks() {
    this.stocks = await this.stocksService.getPortfolio();
  }
}
