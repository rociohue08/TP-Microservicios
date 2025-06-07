// AppModule: configuración general del proyecto
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItsProductoModule } from './its-producto.module';
import { Producto } from './entities/producto.entity';
import { envs } from './config/envs';

@Module({
  imports: [
    // se usa para configurar la conexión global a la base de datos 
    TypeOrmModule.forRoot({
      //configuracion de typeorm
      type: 'mysql', //lo q utiliza para conectarse
      host: envs.DB_HOST,
      port: parseInt(envs.DB_PORT),
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
      // autoLoadEntities: true,
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ItsProductoModule,  //Usa Producto y Reserva
  ],
})
export class AppModule {}