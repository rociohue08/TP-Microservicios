import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CarritoController } from './carrito.controller';
import { CarritoService } from './carrito.service';

@Module({
  controllers: [CarritoController], 
  providers: [
    CarritoService,
    PrismaService 
  ],
})
export class CarritoModule {}