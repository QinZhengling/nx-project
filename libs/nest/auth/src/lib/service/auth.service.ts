/* eslint-disable @nx/enforce-module-boundaries */
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcryptjs from 'bcryptjs';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UserService } from 'libs/nest/user/src/lib/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { rxdb } from 'libs/nest/database/rxdb';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly rxdb: rxdb
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(account: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    console.log(account, password);

    const user = await this.usersService.findOne(account);
    if (user) {
      const hashedPassword = user.password;
      const isOk = bcryptjs.compareSync(password, hashedPassword);
      if (isOk) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const roles = await this.usersService.findRoleById(user.account);
    const role: number[] = [];
    roles.some((item) => {
      role.push(item.role_id);
    });
    console.log(role);

    const payload = {
      userId: user.id,
      username: user.username,
      account: user.account,
      roles: role,
    };

    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          roles: role,
          token,
          id: user.id,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }

  async register(createAuthDto: CreateAuthDto) {
    const { username, account, password, sex, age } = createAuthDto;
    console.log(createAuthDto);

    const existUser = await this.usersService.findOne(account);
    if (existUser) {
      throw new BadRequestException('注册用户已存在');
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    createAuthDto.id = uuidv4();
    createAuthDto.password = hashPassword;
    console.log(createAuthDto);
    createAuthDto.create_time = new Date();
    const mydb = await this.rxdb.my_rxdb();
    const result = await mydb.user.insert({
      ...createAuthDto,
    });
    mydb.ulogdb.insert({
      id: uuidv4(),
      username: username,
      account: account,
      u_do: '用户名为：' + username + ' 账号为：' + account + '的用户注册成功',
      create_time: new Date(),
      create_user: '注册',
    });
    const res = await result._data;
    console.log(res);
    addRxPlugin(RxDBDevModePlugin);
    return {
      code: 600,
      msg: `注册成功`,
      data: {
        userId: res.id,
        username: res.username,
        age: res.age,
      },
    };
  }
}
