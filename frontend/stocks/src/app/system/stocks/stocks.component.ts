import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../shared/services/stocks.service';
import IStock from '../../shared/interfaces/stock.interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit {
  public stockName: string = '';
  public stock: IStock;
  public view: boolean = false;

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {}

  async addToPortfolio(stock: IStock) {
    await this.stocksService.addToPortfolio(stock);

    return Swal.fire({
      title: 'Ação adicionada!',
      icon: 'success',
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  async getStock() {
    try {
      const result = await this.stocksService.getStockByName(this.stockName);
      this.stock = result;
      this.view = true;
    } catch (error) {
      return Swal.fire({
        title: 'Ação não encontrada!',
        icon: 'error',
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }
}
