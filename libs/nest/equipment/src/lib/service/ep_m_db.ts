// import { addRxPlugin, createRxDatabase } from 'rxdb';
// import { getRxStorageLoki } from 'rxdb/plugins/storage-lokijs';
// const LokiFsStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter');
// import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
// import { Injectable } from '@nestjs/common';
// @Injectable()
// export class Epm_RxDb {
//   async my_rxdb() {
//     const db = await createRxDatabase({
//       name: 'exampledb',
//       storage: getRxStorageLoki({
//         adapter: new LokiFsStructuredAdapter(),
//       }),
//       ignoreDuplicate: true,
//     });
//     const epdbm = {
//       //keyCompression: true, // set this to true, to enable the keyCompression
//       version: 0,
//       title: 'epmDb',
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
//         m_info: {
//           type: 'string',
//         },
//         m_time: {
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
//         'e_name',
//         'm_info',
//         'm_time',
//         'create_time',
//         'create_user',
//       ],
//     };
//     const equipment = {};

//     addRxPlugin(RxDBDevModePlugin);
//     return await db.addCollections({
//       epdbm: {
//         schema: epdbm,
//       },
//     });
//   }
// }
