import { Injectable } from '@nestjs/common';
import { Log_RxDb } from './logdb';
import { v4 as uuidv4 } from 'uuid';
import { rxdb } from 'libs/nest/database/rxdb';
@Injectable()
export class LogService {
  constructor(private readonly logdb: rxdb) {}

  async findAll() {
    const logdb = await this.logdb.my_rxdb();
    return await logdb.logdb.find().exec();
  }

  async findById(id: string) {
    const logdb = await this.logdb.my_rxdb();
    return await logdb.logdb
      .find({
        selector: {
          e_id: id,
        },
      })
      .exec();
  }
}
