import {
  Get,
  Body,
  Post,
  Param,
  Query,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

import { CompareStocksDto } from '../dto/compare-stocks.dto';
import { Projection, Quote, QuoteHistory } from 'src/interfaces';
import { GetQuoteService } from '../services/get-quote.service';
import { StockGainService } from '../services/stock-gain.service';
import { CompareStocksService } from '../services/compare-stocks.service';
import { GetQuoteHistoryService } from '../services/get-quote-history.service';
import { CompareStocksValidatorPipe } from '../pipes/compare-stocks-validator.pipe';

@Controller('stocks')
export class StocksController {
  constructor(
    private getQuoteService: GetQuoteService,
    private getQuoteHistoryService: GetQuoteHistoryService,
    private compareStocksService: CompareStocksService,
    private stockGainService: StockGainService,
  ) {}

  @Get(':stock_name/quote')
  public async getQuoteInfo(
    @Param('stock_name') stockName: string,
  ): Promise<Quote> {
    return this.getQuoteService.execute(stockName);
  }

  @Get(':stock_name/history')
  public async getQuoteHistory(
    @Param('stock_name') stockName: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ): Promise<QuoteHistory> {
    return this.getQuoteHistoryService.execute(stockName, from, to);
  }

  @Post(':stock_name/compare')
  public async compareStocks(
    @Param('stock_name') stockName: string,
    @Body(CompareStocksValidatorPipe) compareStocksDto: CompareStocksDto,
  ): Promise<{ lastPrices: Quote[] }> {
    return this.compareStocksService.execute(
      stockName,
      compareStocksDto.stocks,
    );
  }

  @Get(':stock_name/gains')
  public async stockGain(
    @Param('stock_name') stockName: string,
    @Query('purchasedAmount', ParseIntPipe) purchasedAmount: number,
    @Query('purchasedAt') purchasedAt: string,
  ): Promise<Projection> {
    return this.stockGainService.execute(
      stockName,
      purchasedAmount,
      purchasedAt,
    );
  }
}
