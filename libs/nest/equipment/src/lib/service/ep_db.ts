// import { addRxPlugin, createRxDatabase } from 'rxdb';
// import { getRxStorageLoki } from 'rxdb/plugins/storage-lokijs';
// const LokiFsStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter');
// import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
// import { Injectable } from '@nestjs/common';
// @Injectable()
// export class Ep_RxDb {
//   async my_rxdb() {
//     const db = await createRxDatabase({
//       name: 'exampledb',
//       storage: getRxStorageLoki({
//         adapter: new LokiFsStructuredAdapter(),
//       }),
//       ignoreDuplicate: true,
//     });
//     const epdb = {
//       //keyCompression: true, // set this to true, to enable the keyCompression
//       version: 0,
//       title: 'epDb',
//       primaryKey: 'id',
//       type: 'object',
//       properties: {
//         id: {
//           type: 'string',
//           maxLength: 100, // <- the primary key must have set maxLength
//         },
//         e_id: {
//           type: 'string',
//         },
//         e_name: {
//           type: 'string',
//         },
//         e_type: {
//           type: 'string',
//         },
//         in_time: {
//           type: 'string',
//         },
//         warranty_time: {
//           type: 'string',
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
//         'e_id',
//         'e_name',
//         'e_type',
//         'in_time',
//         'warranty_time',
//         'create_time',
//         'create_user',
//         'update_time',
//         'update_user',
//       ],
//     };

//     const logdb = {
//       //keyCompression: true, // set this to true, to enable the keyCompression
//       version: 0,
//       title: 'logDb',
//       primaryKey: 'id',
//       type: 'object',
//       properties: {
//         id: {
//           type: 'string',
//           maxLength: 100, // <- the primary key must have set maxLength
//         },
//         e_id: {
//           type: 'string',
//         },
//         e_type: {
//           type: 'string',
//         },
//         e_name: {
//           type: 'string',
//         },
//         e_do: {
//           type: 'string',
//         },
//         create_time: {
//           type: 'string',
//         },
//         create_user: {
//           type: 'string',
//         },
//       },
//       required: [
//         'id',
//         'e_id',
//         'e_type',
//         'e_name',
//         'e_do',
//         'create_time',
//         'create_user',
//       ],
//     };
//     addRxPlugin(RxDBDevModePlugin);
//     return await db.addCollections({
//       epdb: {
//         schema: epdb,
//       },
//       log: {
//         schema: logdb,
//       },
//     });
//   }
// }
