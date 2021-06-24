import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/latest')
  @Redirect('http://papermc.io', 301)
  async getLatest(@Query('mc_version') mcVersion: string) {
    return { url: await this.appService.getLatest(mcVersion) };
  }
}
