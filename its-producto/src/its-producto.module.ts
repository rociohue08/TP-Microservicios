// its-producto.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItsProductoController } from './its-producto.controller';
import { ItsProductoService } from './its-producto.service';
import { Producto} from './entities/producto.entity';
import { Reserva } from './entities/reserva.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto,Reserva]),
  ],
  controllers: [ItsProductoController],
  providers: [ItsProductoService],
})
export class ItsProductoModule {}