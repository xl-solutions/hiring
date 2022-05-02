import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../shared/services/stocks.service';

@Component({
  selector: 'app-compare-stocks',
  templateUrl: './compare-stocks.component.html',
  styleUrls: ['./compare-stocks.component.css'],
})
export class CompareStocksComponent implements OnInit {
  public stockName: string = '';
  public stockList: [] = [];

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {}
}
