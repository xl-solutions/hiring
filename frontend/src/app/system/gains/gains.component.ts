import { Component, OnInit } from '@angular/core';
import IGains from 'src/app/shared/interfaces/gains.interface';
import { StocksService } from 'src/app/shared/services/stocks.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-gains',
  templateUrl: './gains.component.html',
  styleUrls: ['./gains.component.css']
})
export class GainsComponent implements OnInit {
  public stockName: string =''
  public purchasedAt: string =''
  public purchasedAmount: string=''
  public gains:IGains

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
  }

  async getGains(){
    this.gains = await this.stocksService.getEarningsProjection(
      this.stockName,
      this.purchasedAmount,
      this.purchasedAt
    )

  }

}
