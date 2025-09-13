import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { FacturaController } from './factura.controller';
import { FacturaService } from './factura.service';

@Module({
  controllers: [FacturaController],
  providers: [
    FacturaService,
    PrismaService 
  ],
})
export class FacturaModule {}

