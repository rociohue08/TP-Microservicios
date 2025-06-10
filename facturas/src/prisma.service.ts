import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/index';

@Injectable()
export class PrismaService extends PrismaClient {}


//Para inyectar Prisma en NestJS