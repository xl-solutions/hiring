import { Component, OnInit } from '@angular/core';
import IStock from 'src/app/shared/interfaces/stock.interface';
import { StocksService } from '../../shared/services/stocks.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-compare-stocks',
  templateUrl: './compare-stocks.component.html',
  styleUrls: ['./compare-stocks.component.css'],
})
export class CompareStocksComponent implements OnInit {
  public stockName: string = '';
  public stock1: string = '';
  public stock2: string = '';
  public compare: IStock;

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {}

  async getCompare() {
    try {
      this.compare = await this.stocksService.stocksComparation(
        this.stockName,
        [this.stock1, this.stock2]
      );
    } catch (error) {
      return Swal.fire({
        title: error.error.erro,
        icon: 'error',
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }
}
