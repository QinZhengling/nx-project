import { BadRequestException, Injectable } from '@nestjs/common';
import { rxdb } from 'libs/nest/database/rxdb';
import { UserService } from 'libs/nest/user/src/lib/service/user.service';
import { v4 as uuidv4 } from 'uuid';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
@Injectable()
export class RoleService {
  constructor(
    private readonly user: UserService,
    private readonly rxdb: rxdb
  ) {}
  async updateRole(role_id: string, content: string) {
    console.log('update');
    const res = await this.rxdb.my_rxdb();
    return res.role
      .findOne({
        selector: {
          role_id: parseInt(role_id),
        },
      })
      .update({
        $set: {
          role_name: content,
        },
      });
  }
  async getRolesby(id: number) {
    const res = await this.rxdb.my_rxdb();
    return res.role
      .find({
        selector: {
          role_id: id,
        },
      })
      .exec();
  }

  async getRoles() {
    const res = this.rxdb.my_rxdb();
    return (await res).role.find().exec();
  }
  async getUserRole() {
    const res = await this.rxdb.my_rxdb();
    return res.userrole.find().exec();
  }
  async addRole(body: { role_name: string; role_id: string }) {
    const res = await this.rxdb.my_rxdb();
    const ruslt = res.role.findOne({
      selector: {
        // role_name: body.role_name,
        role_id: parseInt(body.role_id),
      },
    });
    if (await ruslt.exec()) {
      throw new BadRequestException('该角色权限已存在');
    }
    const result = await res.role.insert({
      id: uuidv4(),
      role_name: body.role_name,
      role_id: parseInt(body.role_id),
    });
    // addRxPlugin(RxDBDevModePlugin);
    // const user = await res.user
    //   .findOne({
    //     selector: {
    //       account: body.account,
    //     },
    //   })
    //   .exec();
    // let role_arr: number[] = [];
    // for (let i in user._data.role) {
    //   role_arr.push(parseInt(i));
    // }
    // role_arr.push(body.role_id);
    // console.log(role_arr);
    // const result = res.user
    //   .findOne({
    //     selector: { account: body.account },
    //   })
    //   .update({
    //     $set: {
    //       role: role_arr, // sets firstName to foobar
    //     },
    //   });
    return result;
  }

  async delete(id: string) {
    console.log('delete');

    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.role.findOne({
      selector: {
        role_id: parseInt(id),
      },
    });
    console.log(typeof id);

    if ((await query.exec()) !== null) {
      const removedDocs = await query.remove();
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
        message: '不存在或已经删除',
      },
    };
    // if ((await query.exec()) !== null) {
    //   const user = await mydb.user
    //     .findOne({
    //       selector: {
    //         account: account,
    //       },
    //     })
    //     .exec();
    //   let role_arr = user._data.role.filter((x: number) => x !== role_id);
    //   console.log(role_arr);

    // for (let i in user._data.role) {
    //   role_arr.push(i);
    // }
    // const removedDocs = await query.remove();
    //   mydb.ulogdb.insert({
    //     id: uuidv4(),
    //     username: res._data.username,
    //     account: res._data.account,
    //     u_do:
    //       '用户名为：' +
    //       res._data.username +
    //       ' 账号为：' +
    //       res._data.account +
    //       '的用户被删除',
    //     create_time: new Date(),
    //     create_user: '管理员删除',
    //   });
  }
}
