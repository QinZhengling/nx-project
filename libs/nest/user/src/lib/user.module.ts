/* eslint-disable @nx/enforce-module-boundaries */
import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { rxdb } from '../../../database/rxdb';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../../auth/src/lib/service/jwt-auth.guard';
import { RolesGuard } from '../../../auth/src/lib/service/roles.guard';
@Module({
  controllers: [],
  providers: [
    UserService,
    rxdb,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  exports: [UserService],
})
export class UserModule {}
