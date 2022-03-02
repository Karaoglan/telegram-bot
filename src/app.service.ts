import { Injectable } from '@nestjs/common';
import { TelegramService } from 'nestjs-telegram';

@Injectable()
export class AppService {
  Binance = require('node-binance-api');
  binance;

  constructor(private readonly telegram: TelegramService) {
    this.binance = new this.Binance({
      APIKEY: process.env.BINANCE_API_KEY,
      APISECRET: process.env.BINANCE_API_SECRET,
    });
  }

  telegramSayHello(): string {
    const hello = 'Hello World!';
    this.telegram
      .sendMessage({
        chat_id: '@karaoglanbinanancebot',
        text: hello,
      })
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err),
      );
    return hello;
  }

  getCandle(): void {
    // Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
    this.binance.candlesticks(
      'BTCUSDT',
      '12h',
      (error, ticks, symbol) => {
        console.info(`candlesticks()`, ticks);
        const last_tick = ticks[ticks.length - 1];
        const [close, volume] = last_tick;
        console.info(symbol + ' last close: ' + close);
        console.info(volume + ' : vol');
      },
      { limit: 2, endTime: 1514764800000 },
    );
  }
}
