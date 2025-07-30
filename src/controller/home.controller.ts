import { Controller, Get } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<{name: string}> {
    return {name: "Hello"};
  }
}
