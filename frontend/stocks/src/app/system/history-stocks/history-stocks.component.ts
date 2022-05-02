import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../shared/services/stocks.service';
import { Chart, registerables } from 'node_modules/chart.js';
import IStockHistory from '../../shared/interfaces/stock-history.interface';

@Component({
  selector: 'app-history-stocks',
  templateUrl: './history-stocks.component.html',
  styleUrls: ['./history-stocks.component.css'],
})
export class HistoryStocksComponent implements OnInit {
  public stockName: string = '';
  public date1: string = '';
  public date2: string = '';
  public stockHistory: IStockHistory;
  public chart: any;

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
    this.renderGraph();
  }

  updateGraph() {
    const labels = this.stockHistory.prices.map((stock) => stock.pricedAt);
    const data = this.stockHistory.prices.map((stock) => stock.closing);
    this.chart.data.labels = labels
    this.chart.data.datasets[0].data = data
    this.chart.update()
  }

  renderGraph() {
    Chart.register(...registerables);

    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'valor',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  async getHistory() {
    this.stockHistory = await this.stocksService.getStockHistory(
      this.stockName,
      this.date1,
      this.date2
    );
    this.updateGraph();
  }
}
