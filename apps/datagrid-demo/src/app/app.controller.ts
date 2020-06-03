import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiModel } from '@angular-libs/api-model';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): ApiModel[] {
    return this.appService.getData();
  }
}
