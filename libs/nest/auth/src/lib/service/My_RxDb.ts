// import { addRxPlugin, createRxDatabase } from 'rxdb';
// import { getRxStorageLoki } from 'rxdb/plugins/storage-lokijs';
// const LokiFsStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter');
// import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
// import { Injectable } from '@nestjs/common';
// @Injectable()
// export class My_RxDb {
//   async my_rxdb() {
//     const db = await createRxDatabase({
//       name: 'exampledb',
//       storage: getRxStorageLoki({
//         adapter: new LokiFsStructuredAdapter(),
//       }),
//       ignoreDuplicate: true,
//     });
//     const userdb = {
//       //keyCompression: true, // set this to true, to enable the keyCompression
//       version: 0,
//       title: 'userDB',
//       primaryKey: 'id',
//       type: 'object',
//       properties: {
//         id: {
//           type: 'string',
//           maxLength: 100, // <- the primary key must have set maxLength
//         },
//         username: {
//           type: 'string',
//         },
//         account: {
//           type: 'string',
//         },
//         password: {
//           type: 'string',
//         },
//         sex: {
//           type: 'number',
//         },
//         age: {
//           type: 'number',
//         },
//         role_id: {
//           type: 'number',
//         },
//         create_time: {
//           type: 'string',
//         },
//         create_user: {
//           type: 'string',
//         },
//         update_time: {
//           type: 'string',
//         },
//         update_user: {
//           type: 'string',
//         },
//       },
//       required: [
//         'id',
//         'username',
//         'account',
//         'password',
//         'sex',
//         'age',
//         'role_id',
//         'create_time',
//         'create_user',
//         'update_time',
//         'update_user',
//       ],
//     };
//     const equipment = {};

//     addRxPlugin(RxDBDevModePlugin);
//     return await db.addCollections({
//       user: {
//         schema: userdb,
//       },
//     });
//   }
// }
