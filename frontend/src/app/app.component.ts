import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'stocks';

  public listItems = [
    { title: 'Meu portifólio', label: 'portfolio', selected: true },
    { title: 'Ações', label: 'stocks' },
    { title: 'Histórico de greços', label: 'history' },
    { title: 'Projeção de ganhos', label: 'gains' },
    { title: 'Comparar ações', label: 'compare' },
  ];
  public isGains: boolean = false;
  public isStocks: boolean = false;
  public isPortfolio: boolean = true;
  public isHistory: boolean = false;
  public isCompare: boolean = false;

  getItem(item) {
    this.isGains = false;
    this.isPortfolio = false;
    this.isStocks = false;
    this.isHistory = false;
    this.isCompare = false;
    if (item.label == 'portfolio') {
      this.isPortfolio = true;
    }
    if (item.label == 'stocks') {
      this.isStocks = true;
    }
    if (item.label == 'history') {
      this.isHistory = true;
    }
    if (item.label == 'gains') {
      this.isGains = true;
    }
    if (item.label == 'compare') {
      this.isCompare = true;
    }
  }
}
