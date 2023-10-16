import { Module } from '@nestjs/common';
import { EquipmentService } from './service/equipment.service';
import { EquipmentMService } from './service/equipment_m.service';

import { rxdb } from '../../../database/rxdb';
import { equipmentdto } from './service/equipmentdto';
import { LogService } from 'libs/nest/log/src/lib/service/log.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'libs/nest/auth/src/lib/service/jwt-auth.guard';
import { RolesGuard } from 'libs/nest/auth/src/lib/service/roles.guard';
@Module({
  imports: [equipmentdto],
  controllers: [],
  providers: [
    EquipmentService,
    EquipmentMService,
    LogService,
    rxdb,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
  exports: [EquipmentService, EquipmentMService, equipmentdto],
})
export class EquipmentModule {}
