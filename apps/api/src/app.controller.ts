import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      success: true,
      message: 'UPNA LOAN API is running',
    };
  }
}