import { Module } from '@nestjs/common';
import { AuthModule } from '@nx-porject/auth';
import { EquipmentModule } from '@nx-porject/equipment';
import { LogModule } from '@nx-porject/log';
import { RoleModule } from '@nx-porject/role';
import { UserModule } from '@nx-porject/user';
import { AuthController } from './controller/auth.controller';
import { EquipmentController } from './controller/equipment.controller';
import { LogController } from './controller/log.controller';
import { RoleController } from './controller/role.controller';
import { UserController } from './controller/user.controller';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from 'libs/nest/auth/src/lib/service/jwt-auth.guard';
import { RolesGuard } from 'libs/nest/auth/src/lib/service/roles.guard';
import { rxdb } from 'libs/nest/database/rxdb';
@Module({
  imports: [AuthModule, UserModule, EquipmentModule, LogModule, RoleModule],
  controllers: [
    AuthController,
    UserController,
    EquipmentController,
    LogController,
    RoleController,
  ],
  providers: [
    {
      provide: 'RxDBInstance', // 提供程序的标识符
      useFactory: async () => {
        const instance = new rxdb();
        await instance.my_rxdb(); // 调用my_rxdb方法初始化RxDB实例
        return instance;
      },
    },
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAuthGuard,
  //   },
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule {}
