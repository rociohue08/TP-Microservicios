
// import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
// import { PrismaClient } from '../generated/prisma';
// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//     this.enableShutdownHooks();
//   }

//   enableShutdownHooks() {
//     process.on('beforeExit', async () => {
//       await this.$disconnect();
//     });
//   }
// }

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/index';

@Injectable()
export class PrismaService extends PrismaClient {}

