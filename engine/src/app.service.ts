import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {

  getTitle(asin: string): string {
    return asin;
  }
}
