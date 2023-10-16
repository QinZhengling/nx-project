import { Module } from '@nestjs/common';
import { RoleService } from './service/role.service';
import { rxdb } from 'libs/nest/database/rxdb';
import { UserService } from 'libs/nest/user/src/lib/service/user.service';
@Module({
  controllers: [],
  providers: [RoleService, rxdb, UserService],
  exports: [RoleService],
})
export class RoleModule {}
