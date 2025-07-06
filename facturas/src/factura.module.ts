import { Module } from '@nestjs/common';
import { FacturasController } from './factura.controller';
import { FacturasService } from './factura.service';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [FacturasController],
  providers: [
    FacturasService,
    PrismaService // ← Importante: registrado aquí
  ],
})
export class AppModule {}

//Registra todos los providers