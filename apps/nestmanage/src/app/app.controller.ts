import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'libs/nest/auth/src/lib/service/jwt-auth.guard';
@UseGuards(JwtAuthGuard) // 使用 'JWT' 进行验证
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
