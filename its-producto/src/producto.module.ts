import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto} from './entities/producto.entity';
import { Reserva } from './entities/reserva.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto,Reserva]),
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ItsProductoModule {}

