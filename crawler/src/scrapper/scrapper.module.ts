import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [ScrapperController],
  providers: [ScrapperService],
})
export class ScrapperModule {}
