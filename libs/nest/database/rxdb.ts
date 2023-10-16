import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageLoki } from 'rxdb/plugins/storage-lokijs';
const LokiFsStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter');
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { Injectable } from '@nestjs/common';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
export class rxdb {
  async my_rxdb() {
    const db = await createRxDatabase({
      name: './db/exampledb',
      // name: 'exampledb',
      storage: getRxStorageLoki({
        adapter: new LokiFsStructuredAdapter(),
      }),
      ignoreDuplicate: true,
    });
    addRxPlugin(RxDBDevModePlugin);

    addRxPlugin(RxDBUpdatePlugin);
    return await db.addCollections({
      user: {
        schema: this.userdb,
      },
      epdb: {
        schema: this.epdb,
      },
      epdbm: {
        schema: this.epdbm,
      },
      logdb: {
        schema: this.logdb,
      },
      ulogdb: {
        schema: this.userdb,
      },
      userrole: {
        schema: this.userrole,
      },
      role: {
        schema: this.role,
      },
    });
  }
  readonly userdb = {
    //keyCompression: true, // set this to true, to enable the keyCompression
    version: 0,
    title: 'userDB',
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100, // <- the primary key must have set maxLength
      },
      username: {
        type: 'string',
      },
      account: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      sex: {
        type: 'number',
      },
      age: {
        type: 'number',
      },
      create_time: {
        type: 'string',
      },
      create_user: {
        type: 'string',
      },
      update_time: {
        type: 'string',
      },
      update_user: {
        type: 'string',
      },
    },
    required: [
      'id',
      'username',
      'account',
      'password',
      'sex',
      'age',
      'role',
      'create_time',
      'create_user',
      'update_time',
      'update_user',
    ],
  };

  readonly epdb = {
    //keyCompression: true, // set this to true, to enable the keyCompression
    version: 0,
    title: 'epDb',
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100, // <- the primary key must have set maxLength
      },
      e_id: {
        type: 'string',
      },
      e_name: {
        type: 'string',
      },
      e_state: {
        type: 'string',
      },
      e_type: {
        type: 'string',
      },
      in_time: {
        type: 'string',
      },
      warranty_time: {
        type: 'string',
      },
      create_time: {
        type: 'string',
      },
      create_user: {
        type: 'string',
      },
      update_time: {
        type: 'string',
      },
      update_user: {
        type: 'string',
      },
    },
    required: [
      'id',
      'e_id',
      'e_name',
      'e_type',
      'in_time',
      'warranty_time',
      'create_time',
      'create_user',
      'update_time',
      'update_user',
    ],
  };

  readonly logdb = {
    //keyCompression: true, // set this to true, to enable the keyCompression
    version: 0,
    title: 'logDb',
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100, // <- the primary key must have set maxLength
      },
      e_id: {
        type: 'string',
      },
      e_type: {
        type: 'string',
      },
      e_name: {
        type: 'string',
      },
      e_do: {
        type: 'string',
      },
      create_time: {
        type: 'string',
      },
      create_user: {
        type: 'string',
      },
    },
    required: [
      'id',
      'e_id',
      'e_type',
      'e_name',
      'e_do',
      'create_time',
      'create_user',
    ],
  };

  readonly epdbm = {
    //keyCompression: true, // set this to true, to enable the keyCompression
    version: 0,
    title: 'epmDb',
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100, // <- the primary key must have set maxLength
      },
      e_id: {
        type: 'string',
      },
      e_name: {
        type: 'string',
      },
      m_info: {
        type: 'string',
      },
      m_time: {
        type: 'string',
      },
      create_time: {
        type: 'string',
      },
      create_user: {
        type: 'string',
      },
    },
    required: [
      'id',
      'e_id',
      'e_name',
      'm_info',
      'm_time',
      'create_time',
      'create_user',
    ],
  };

  readonly ulogdb = {
    //keyCompression: true, // set this to true, to enable the keyCompression
    version: 0,
    title: 'userlogDb',
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100, // <- the primary key must have set maxLength
      },
      username: {
        type: 'string',
      },
      account: {
        type: 'string',
      },
      u_do: {
        type: 'string',
      },
      create_time: {
        type: 'string',
      },
      create_user: {
        type: 'string',
      },
    },
    required: [
      'id',
      'e_id',
      'e_type',
      'e_name',
      'e_do',
      'create_time',
      'create_user',
    ],
  };

  readonly userrole = {
    version: 0,
    title: 'userRole',
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100, // <- the primary key must have set maxLength
      },
      role_id: {
        type: 'number',
      },
      user_id: {
        type: 'string',
      },
    },
    required: ['id', 'role_id', 'user_id'],
  };

  readonly role = {
    version: 0,
    title: 'role',
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100, // <- the primary key must have set maxLength
      },
      role_id: {
        type: 'number',
      },
      role_name: {
        type: 'string',
      },
    },
    required: ['id', 'role_id', 'role_name'],
  };
}
