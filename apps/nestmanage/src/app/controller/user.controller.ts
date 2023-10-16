// src/logical/user/user.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Put,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'libs/nest/user/src/lib/service/user.service';
import { userDto } from 'libs/nest/user/src/lib/service/dto/userDto';
import { LogService } from 'libs/nest/log/src/lib/service/log.service';
import { JwtAuthGuard } from 'libs/nest/auth/src/lib/service/jwt-auth.guard';
import { Role } from 'libs/public/role';
import { Roles } from 'libs/nest/auth/src/lib/dto/create-role.dto';
import { RolesGuard } from 'libs/nest/auth/src/lib/service/roles.guard';
@UseGuards(JwtAuthGuard) // 使用 'JWT' 进行验证
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly ulog: LogService
  ) {}

  @Get('/hello')
  @Roles(Role.Admin)
  async getHello() {
    return {
      msg: 'Hello World!',
    };
  }
  /**
   * 添加用户信息
   * @returns
   */
  @Post()
  addUser(@Body() Body: userDto) {
    console.log(Body);
    return this.userService.create(Body);
  }

  /**
   * 删除指定用户
   * @returns
   */
  @Delete(':userId/roles/:role_id')
  delRole(@Param('userId') userId: string, @Param('role_id') role_id: string) {
    console.log(userId, role_id);
    return this.userService.delRole(userId, role_id);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    console.log(id);
    return this.userService.deleteUser(id);
  }

  /**
   * 修改用户密码
   * @returns
   */
  @Patch(':id')
  changePassword(@Param('id') id: string, @Body('password') password: string) {
    console.log(id, password);
    return this.userService.changePassword(id, password);
  }

  /**
   * 修改用户信息
   * @returns
   */
  @Put(':id/roles')
  updateUserRole(@Param('id') id: string, @Body('role_id') role_id: string) {
    console.log(id, role_id);

    return this.userService.updateUserRole(id, role_id);
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.userService.updateUser(id, body);
  }

  /**
   * 查询所有用户
   * @returns
   */
  @Get()
  @UseGuards(RolesGuard) // 使用 'JWT' 进行验证
  @Roles(Role.Admin)
  // @UseInterceptors(new RbacInterceptor(3)) // 调用 RBAC 拦截器
  findAll(
    @Query('username') username: string,
    @Query('account') account: string,
    @Query('PageIndex') PageIndex: number,
    @Query('PageSize') PageSize: number
  ) {
    const Page = { PageIndex, PageSize };
    const searchValue = {
      username,
      account,
    };
    // console.log(searchValue, Page);

    return this.userService.findAll(searchValue, Page);
  }

  @Get('/page')
  findPage(
    @Query('PageIndex') PageIndex: number,
    @Query('PageSize') PageSize: number
  ) {
    return this.userService.findPage(PageIndex, PageSize);
  }

  /**
   * 查询所有用户日志记录
   * @returns
   */
  @Get('/logs')
  getlog() {
    return this.userService.getlog();
  }
  @Get('/logs/page')
  findLogPage(
    @Query('PageIndex') PageIndex: number,
    @Query('PageSize') PageSize: number
  ) {
    return this.userService.logPage(PageIndex, PageSize);
  }
  /**
   * 查询指定用户
   * @returns
   */
  @Get(':id')
  findUserById(@Param('id') id: string) {
    // console.log(id);
    return this.userService.findUserById(id);
  }

  /**
   * /查询指定用户log
   * @returns
   */
  @Get(':id/logs')
  getlogById(@Param('id') id: string) {
    console.log(id, 'logs');
    return this.userService.getlogById(id);
  }
  /**
   * 添加用户权限信息
   * @returns
   */
  @Post(':id/role_id')
  addRole(@Param('id') id: string, @Body('role_id') role_id: string) {
    // console.log(id, role_id);
    return this.userService.addRole(id, role_id);
  }
}
