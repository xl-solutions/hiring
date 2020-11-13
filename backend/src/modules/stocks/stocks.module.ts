import { HttpModule, Module } from '@nestjs/common';

import { GetQuoteService } from './services/get-quote.service';
import { StockGainService } from './services/stock-gain.service';
import { StocksController } from './controllers/stocks.controller';
import { CompareStocksService } from './services/compare-stocks.service';
import { GetQuoteHistoryService } from './services/get-quote-history.service';

@Module({
  imports: [HttpModule],
  providers: [
    GetQuoteService,
    StockGainService,
    StockGainService,
    CompareStocksService,
    GetQuoteHistoryService,
  ],
  controllers: [StocksController],
})
export class StocksModule {}
