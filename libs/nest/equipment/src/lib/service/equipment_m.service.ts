import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { LogService } from 'libs/nest/log/src/lib/service/log.service';
import { rxdb } from 'libs/nest/database/rxdb';

@Injectable()
export class EquipmentMService {
  async findPage(PageIndex: number, pageSize: number) {
    const mydb = await this.rxdb.my_rxdb();
    const query = await mydb.epdbm
      .find()
      .skip(pageSize * (PageIndex - 1))
      .limit(pageSize)
      .exec();
    const total = (await mydb.epdbm.find().exec()).length;
    return { total: total, items: query };
  }
  constructor(
    private readonly rxdb: rxdb,
    private readonly logservice: LogService
  ) {}
  async addEp(body: any) {
    const { e_id, m_info, m_time, e_name } = body;
    const mydb = await this.rxdb.my_rxdb();
    const ep = mydb.epdb.findOne({
      selector: {
        e_id: e_id,
      },
    });
    console.log(await ep.exec());

    if (!(await ep.exec())) {
      throw new BadRequestException('该equipment Not存在');
    }
    const query = mydb.epdbm.findOne({
      selector: {
        e_id: e_id,
        m_info: m_info,
        m_time: m_time,
      },
    });

    if (await query.exec()) {
      throw new BadRequestException('该维修记录已存在');
    }
    body.id = uuidv4();
    const result = await mydb.epdbm.insert({
      ...body,
    });
    return {
      success: true,
      value: {
        message: '设备维修记录添加成功',
      },
    };
  }
  async deleteEp(e_id: string, id: string) {
    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.epdbm.findOne({
      selector: {
        id: id,
        e_id: e_id,
      },
    });
    console.log(await query.exec());
    if ((await query.exec()) !== null) {
      const removedDocs = await query.remove();
      return {
        success: true,
        value: {
          message: '设备维护记录删除成功',
        },
      };
    }
    throw new BadRequestException('设备维护记录删除失败');
  }
  async getById(id: string) {
    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.epdbm.find({
      selector: {
        e_id: id,
      },
    });
    console.log(await query.exec());
    if ((await query.exec()) === null) {
      throw new BadRequestException('未找到该设备维护记录');
    }
    return await query.exec();
  }
  async getAll() {
    const mydb = await this.rxdb.my_rxdb();
    const query = mydb.epdbm.find();
    const results = await query.exec();
    return results;
  }
}
