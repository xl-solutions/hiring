import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './system/header/header.component';
import { GainsComponent } from './system/gains/gains.component';
import { StocksComponent } from './system/stocks/stocks.component';
import { PortfolioComponent } from './system/portfolio/portfolio.component';
import { HistoryStocksComponent } from './system/history-stocks/history-stocks.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CompareStocksComponent } from './system/compare-stocks/compare-stocks.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GainsComponent,
    StocksComponent,
    PortfolioComponent,
    HistoryStocksComponent,
    CompareStocksComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
