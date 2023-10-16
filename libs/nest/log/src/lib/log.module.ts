import { Module } from '@nestjs/common';
import { LogService } from './service/log.service';
import { rxdb } from 'libs/nest/database/rxdb';

@Module({
  controllers: [],
  providers: [LogService, rxdb],
  exports: [LogService],
})
export class LogModule {}
