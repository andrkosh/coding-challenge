import {Controller, Get, Post, Inject, Query, Body} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('MY_SERVICE') private client: ClientProxy, private readonly appService: AppService) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get('get-title')
  getTitle(@Query('asin') asin: string): string {
    this.client.emit<any>('get-title', { text: asin });
    return this.appService.getTitle(asin);
  }

  @Post('get-title-scheduled')
  getTitleScheduled(@Body() body): string {
    console.log(body.asin)
    console.log(body.crontab)
    this.client.emit<any>('get-title-scheduled', { text: body.asin, crontab: body.crontab });
    return this.appService.getTitle(body.asin);
  }

  @Post('stop')
  stopScheduledJob(): string {
    this.client.emit<any>('stop-scheduled-job', {});
    return 'Cron job is stopped';
  }
}
