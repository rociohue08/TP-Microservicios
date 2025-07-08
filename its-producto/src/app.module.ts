import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Producto } from './entities/producto.entity';
import { envs } from './config/envs';
import { AppController } from './app.controller';
import { ProductosController } from './productos.controller';
import { Reserva } from './entities/reserva.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.DB_HOST,
      port: parseInt(envs.DB_PORT),
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Producto,Reserva]), // ← Aquí registras el repositorio
  ],
  controllers: [ProductosController, AppController],
  providers: [AppService],
  exports: [TypeOrmModule], // ← Exporta para reusarlo en otros módulos si los usas
})
export class AppModule {}