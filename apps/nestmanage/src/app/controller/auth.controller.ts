import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAuthDto } from 'libs/nest/auth/src/lib/dto/create-auth.dto';
import { AuthService } from 'libs/nest/auth/src/lib/service/auth.service';
import { UserService } from 'libs/nest/user/src/lib/service/user.service';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
export const jwtConstants = {
  secret: 'secretKey',
};
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService
  ) {}

  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  async login(@Body() loginParmas: { account: string; password: string }) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.account,
      loginParmas.password
    );
    console.log('111', loginParmas.account, loginParmas.password);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  // @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('register')
  async register(@Body() body: CreateAuthDto) {
    // console.log(body);
    return await this.authService.register(body);
  }
}
