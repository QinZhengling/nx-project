/* eslint-disable @nx/enforce-module-boundaries */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './service/constants';

import { JwtStrategy } from './service/jwt.stratagy';
// import { LocalStrategy } from './service/jwt-auth.guard';
import { AuthService } from './service/auth.service';
import { UserModule } from '@nx-porject/user';
// import { UserService } from 'libs/nest/user/src/lib/service/user.service';
import { rxdb } from 'libs/nest/database/rxdb';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' }, // token 过期时效
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, rxdb],
  exports: [AuthService],
})
export class AuthModule {}
