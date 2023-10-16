import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LogService } from 'libs/nest/log/src/lib/service/log.service';
@Controller('eplog')
// @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
export class LogController {
  constructor(private readonly log: LogService) {}

  @Get()
  getAll() {
    return this.log.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return id;
  }
}
