import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { addRxPlugin } from 'rxdb';

import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { LogService } from 'libs/nest/log/src/lib/service/log.service';
import { rxdb } from 'libs/nest/database/rxdb';
@Injectable()
export class EquipmentService {
  async logPage(PageIndex: number, pageSize: number) {
    const mydb = await this.rxdb.my_rxdb();
    const query = await mydb.logdb
      .find()
      .skip(pageSize * (PageIndex - 1))
      .limit(pageSize)
      .exec();
    const total = (await mydb.logdb.find().exec()).length;
    return { total: total, items: query };
  }
  constructor(
    private readonly rxdb: rxdb,
    private readonly logservice: LogService
  ) {}
  getlogs() {
    return this.logservice.findAll();
  }
  getLogsByid(e_id: string) {
    return this.logservice.findById(e_id);
  }
  async getAll(
    searchValue: {
      e_id: string;
      e_name: string;
      e_state: string;
      e_type: string;
      in_time: string;
      warranty_time: string;
    },
    Page: { PageIndex: number; PageSize: number }
  ) {
    const { e_id, e_name, e_state, e_type, in_time, warranty_time } =
      searchValue;
    const { PageIndex, PageSize } = Page;
    const mydb = await this.rxdb.my_rxdb();
    let query = mydb.epdb.find();
    if (e_id) {
      query = query.where('e_id').regex(new RegExp(e_id, 'i'));
    }
    if (e_name) {
      query = query.where('e_name').regex(new RegExp(e_name, 'i'));
    }
    if (e_type) {
      query = query.where('e_type').regex(new RegExp(e_type, 'i'));
    }
    if (e_state) {
      query = query.where('e_state').regex(new RegExp(e_state, 'i'));
    }
    if (in_time) {
      query = query.where('in_time').regex(new RegExp(in_time, 'i'));
    }
    if (warranty_time) {
      query = query
        .where('warranty_time')
        .regex(new RegExp(warranty_time, 'i'));
    }
    // const search = {
    //   $or: [
    //     { e_id: { $regex: new RegExp(e_id, 'i') } },
    //     { e_name: { $regex: new RegExp(e_name, 'i') } },
    //     { e_state: { $regex: new RegExp(e_state, 'i') } },
    //     { e_type: { $regex: new RegExp(e_type, 'i') } },
    //     { in_time: { $regex: new RegExp(in_time, 'i') } },
    //     { warranty_time: { $regex: new RegExp(warranty_time, 'i') } },
    //   ],
    // };

    query.skip(PageSize * (PageIndex - 1)).limit(PageSize);
    const results = await query.exec();
    console.log(results);

    const total = (await mydb.epdb.find().exec()).length;
    return { total: total, items: results };
  }
  async findPage(PageIndex: number, pageSize: number) {
    const mydb = await this.rxdb.my_rxdb();
    const query = await mydb.epdb
      .find()
      .skip(pageSize * (PageIndex - 1))
      .limit(pageSize)
      .exec();
    const total = (await mydb.epdb.find().exec()).length;
    return { total: total, items: query };
  }
  async addEp(body: any) {
    const mydb = await this.rxdb.my_rxdb();
    const { e_id, id } = body;
    const query = mydb.epdb.findOne({
      selector: {
        e_id: e_id,
      },
    });
    body.id = uuidv4();
    body.create_time = new Date().toLocaleString();
    body.update_time = new Date().toLocaleString();
    // console.log(await query.exec());
    if (await query.exec()) {
      throw new BadRequestException('该设备已存在');
    }
    const result = await mydb.epdb.insert({
      ...body,
    });
    const obj = {
      id: uuidv4(),
      e_id: e_id,
      e_name: body.e_name,
      e_type: body.e_type,
      e_do: '添加设备: ' + e_id + '设备名称: ' + body.e_name,
      create_time: body.create_time,
      create_user: body.create_user,
    };
    mydb.logdb.insert({
      ...obj,
    });
    return {
      success: true,
      value: {
        message: '设备信息添加成功',
      },
    };
  }
  async deleteEp(id: string) {
    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.epdb.findOne({
      selector: {
        id: id,
      },
    });
    const reult = await query.exec();
    // console.log(await query.exec());
    if ((await query.exec()) !== null) {
      const removedDocs = await query.remove();
      const obj = {
        id: uuidv4(),
        e_id: reult._data.id,
        e_name: reult._data.e_name,
        e_type: reult._data.e_type,
        e_do: '删除了设备ID为' + reult._data.e_id + '的设备',
        create_time: new Date(),
        create_user: '删除人:xxx',
      };
      mydb.logdb.insert({
        ...obj,
      });

      return {
        success: true,
        value: {
          message: '设备删除成功',
        },
      };
    }
    throw new BadRequestException('设备删除失败');
  }
  async updateEp(id: string, Body: any) {
    addRxPlugin(RxDBUpdatePlugin);
    const mydb = await this.rxdb.my_rxdb();
    Body.update_time = new Date();
    const query = await mydb.epdb
      .findOne({
        selector: {
          id: id,
        },
      })
      .update({
        $set: { ...Body },
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
  async getById(id: string) {
    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.epdb.findOne({
      selector: {
        e_id: id,
      },
    });
    console.log(await query.exec());
    if ((await query.exec()) === null) {
      throw new BadRequestException('未找到相关设备信息');
    }
    return await query.exec();
  }
}
