import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcryptjs from 'bcryptjs';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { addRxPlugin } from 'rxdb';
import { userDto } from './dto/userDto';
import { stringify } from 'querystring';
import { rxdb } from 'libs/nest/database/rxdb';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
addRxPlugin(RxDBQueryBuilderPlugin);
@Injectable()
export class UserService {
  constructor(private readonly rxdb: rxdb) {}

  async getlog() {
    const ulog = await this.rxdb.my_rxdb();
    return await ulog.ulogdb.find().exec();
  }
  async logPage(PageIndex: number, pageSize: number) {
    const mydb = await this.rxdb.my_rxdb();
    const query = await mydb.ulogdb
      .find()
      .skip(pageSize * (PageIndex - 1))
      .limit(pageSize)
      .exec();
    const total = (await mydb.ulogdb.find().exec()).length;
    return { total: total, items: query };
  }
  async getlogById(id: string) {
    const ulog = await this.rxdb.my_rxdb();
    return await ulog.ulogdb
      .findOne({
        selector: {
          account: id,
        },
      })
      .exec();
  }

  async delRole(id: string, role_id: string) {
    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.userrole.findOne({
      selector: {
        user_id: id,
        role_id: parseInt(role_id),
      },
    });
    if ((await query.exec()) !== null) {
      const removedDocs = await query.remove();
      return removedDocs;
    }

    throw new BadRequestException('用户该权限不存在或已删除');
  }
  async updateUserRole(id: string, role_id: string) {
    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.userrole
      .findOne({
        selector: {
          user_id: id,
        },
      })
      .update({
        $set: {
          role_id: parseInt(role_id),
        },
      });
  }
  async addRole(id: string, role_id: string) {
    const mydb = await this.rxdb.my_rxdb();
    const role = mydb.role.findOne({
      selector: {
        role_id: parseInt(role_id),
      },
    });
    const user = mydb.user.findOne({
      selector: {
        account: id,
      },
    });
    console.log(await role.exec());

    if ((await role.exec()) === null) {
      throw new BadRequestException('该权限不存在');
    }
    if ((await user.exec()) === null) {
      throw new BadRequestException('该User不存在');
    }
    const query = mydb.userrole.findOne({
      selector: {
        user_id: id,
        role_id: parseInt(role_id),
      },
    });
    if (await query.exec()) {
      throw new BadRequestException('用户该权限已存在');
    }
    const result = mydb.userrole.insert({
      id: uuidv4(),
      user_id: id,
      role_id: parseInt(role_id),
    });
    return result;
  }
  async findRoleById(user_id: string) {
    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.userrole
      .find({
        selector: {
          user_id: user_id,
        },
      })
      .exec();
    return query;
  }
  async create(body: userDto) {
    const { username, account, age, sex, password } = body;
    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.user.findOne({
      selector: {
        account: account,
      },
    });
    if (await query.exec()) {
      throw new BadRequestException('注册用户已存在');
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    body.id = uuidv4();
    body.password = hashPassword;
    body.create_time = new Date();
    console.log(body);
    const result = await mydb.user.insert({
      ...body,
    });
    mydb.ulogdb.insert({
      id: uuidv4(),
      username: username,
      account: account,
      u_do: '用户名为：' + username + ' 账号为：' + account + '的用户添加成功',
      create_time: new Date(),
      create_user: '管理员新增',
    });
    return {
      message: '添加成功',
    };
  }

  async findAll(
    searchValue: {
      username: string;
      account: string;
    },
    Page: { PageIndex: number; PageSize: number }
  ) {
    const { username, account } = searchValue;
    const { PageIndex, PageSize } = Page;
    const mydb = await this.rxdb.my_rxdb();
    let query = mydb.user.find();

    if (username) {
      query = query.where('username').regex(new RegExp(username, 'i'));
    }
    if (account) {
      query = query.where('account').regex(new RegExp(account, 'i'));
    }
    query.skip(PageSize * (PageIndex - 1)).limit(PageSize);
    const results = await query.exec();
    console.log(results);

    const total = (await mydb.epdb.find().exec()).length;
    return { total: total, items: results };
  }
  async findPage(PageIndex: number, pageSize: number) {
    const mydb = await this.rxdb.my_rxdb();
    const query = await mydb.user
      .find()
      .skip(pageSize * (PageIndex - 1))
      .limit(pageSize)
      .exec();
    const total = (await mydb.user.find().exec()).length;
    return { total: total, items: query };
  }
  async changePassword(id: string, password: string) {
    addRxPlugin(RxDBUpdatePlugin);
    const mydb = await this.rxdb.my_rxdb();
    const hashPassword = bcryptjs.hashSync(password, 10);
    const query = await mydb.user
      .findOne({
        selector: {
          id: id,
        },
      })
      .update({
        $set: {
          password: hashPassword,
        },
      });
    if (query === null) {
      throw new BadRequestException('密码修改失败');
    }
    return {
      success: true,
      value: {
        message: '密码修改成功',
      },
    };
  }

  async findOne(account: string) {
    console.log(account);
    const mydb = await this.rxdb.my_rxdb();
    console.log(mydb);
    const query = mydb.user.findOne({
      selector: {
        account,
      },
    });
    console.log(await query.exec());

    return await query.exec();
  }

  async findUserById(user_id: string) {
    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.user.findOne({
      selector: {
        account: user_id,
      },
    });

    const results = await query.exec();
    // console.log(results);
    if (results === null) {
      throw new BadRequestException('用户查询失败');
    }
    const rolelist = await mydb.userrole
      .find({
        selector: { user_id: results.account },
      })
      .exec();

    return {
      success: true,
      value: {
        name: results.username,
        account: results.account,
        age: results.age,
        sex: results.sex,
        role: results.role,
      },
    };
  }

  async updateUser(id: string, updateUserDto: any) {
    addRxPlugin(RxDBUpdatePlugin);
    const mydb = await this.rxdb.my_rxdb();
    const query = await mydb.user
      .findOne({
        selector: {
          id: id,
        },
      })
      .update({
        $set: {
          ...updateUserDto,
        },
      });
    // const results = await query.exec();
    console.log(query);
    if (query === null) {
      throw new BadRequestException('修改失败');
    }
    return {
      success: true,
      value: {
        message: '修改成功',
      },
    };
  }

  async deleteUser(id: string) {
    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.user.findOne({
      selector: {
        id: id,
      },
    });
    const res = await query.exec();
    console.log(await query.exec());
    if ((await query.exec()) !== null) {
      const removedDocs = await query.remove();
      mydb.ulogdb.insert({
        id: uuidv4(),
        username: res._data.username,
        account: res._data.account,
        u_do:
          '用户名为：' +
          res._data.username +
          ' 账号为：' +
          res._data.account +
          '的用户被删除',
        create_time: new Date(),
        create_user: '管理员删除',
      });
      return {
        success: true,
        value: {
          message: '删除成功',
        },
      };
    }
    return {
      success: true,
      value: {
        message: '用户不存在或已经删除',
      },
    };
  }
}
