import { Module } from '@nestjs/common';
import { StocksModule } from '../stocks/stocks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [StocksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
