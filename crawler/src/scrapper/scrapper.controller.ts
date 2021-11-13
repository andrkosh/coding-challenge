import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ScrapperService } from './scrapper.service';

@Controller()
export class ScrapperController {
  constructor(private readonly appService: ScrapperService) {}

  @EventPattern('get-title')
  handleGetTitle(data: Record<string, unknown>): Promise<any> {
    return this.appService.getTitle(data.text);
  }

  @EventPattern('get-title-scheduled')
  handleGetTitleScheduled(data: Record<string, unknown>): Promise<any> {
    return this.appService.getTitleScheduled(data);
  }

  @EventPattern('stop-scheduled-job')
  handleDeleteCronJob(): void {
    return this.appService.deleteCron();
  }
}
