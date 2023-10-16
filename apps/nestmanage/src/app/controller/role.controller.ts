import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  Post,
  Delete,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from 'libs/nest/role/src/lib/service/role.service';
// @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
@Controller('roles')
export class RoleController {
  constructor(private readonly role: RoleService) {}

  @Post()
  addRole(@Body() body: { role_name: string; role_id: string }) {
    console.log(body);

    return this.role.addRole(body);
  }
  @Put(':role_id')
  updateRole(
    @Param('role_id') role_id: string,
    @Body('content') content: string
  ) {
    return this.role.updateRole(role_id, content);
  }
  @Delete(':role_id')
  delete(@Param('role_id') role_id: string) {
    return this.role.delete(role_id);
  }
  @Get('/users')
  getUserRole() {
    console.log('getUserRole');
    return this.role.getUserRole();
  }
  @Get()
  getRoles() {
    return this.role.getRoles();
  }

  @Get(':role_id')
  getRolesByid(@Param('role_id') role_id: number) {
    return this.role.getRolesby(role_id);
  }
}
