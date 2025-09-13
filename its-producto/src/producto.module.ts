import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Reserva } from './entities/reserva.entity';
import { envs } from './config/envs';

import { ProductoController } from './producto.controller';
import { productoService } from './producto.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.DB_HOST,
      port: parseInt(envs.DB_PORT, 10),
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Producto, Reserva]),
  ],
  controllers: [
    ProductoController,    
  ],
  providers: [
    productoService,     
  ],
  exports: [
    TypeOrmModule,]
})
export class ProductoModule {}