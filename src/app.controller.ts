import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  candle(): string {
    this.appService.getCandle();
    return 'success';
  }

  @Get('/hi')
  getHello(): string {
    return this.appService.telegramSayHello();
  }
}
