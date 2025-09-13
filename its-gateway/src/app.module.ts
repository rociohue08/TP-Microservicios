import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { envs } from './config/envs';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtPassport } from './auth/jwt.passport';
import { UsuariosController } from './users/usuarios.controller';
import { MS_USER, MS_PRODUCTO, MS_FACTURA } from './config/constants';
import { ProductosController } from './productos/productos.controller';
import { ReservasController } from './reservas/reservas.controller';
import { CompraController } from './compra/compra.controller';
import { FacturaController } from './factura/factura.controller';
import { CarritoController } from './carrito/carrito.controller';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: MS_USER,
        transport: Transport.TCP,
        options: {
          host: envs.MS_USER_HOST,
          port: envs.MS_USER_PORT,
        },
      },
      {
        name: MS_PRODUCTO,
        transport: Transport.TCP,
        options: {
          host: envs.MS_PRODUCT_HOST,
          port: envs.MS_PRODUCT_PORT,
        },
      },
      {
        name: MS_FACTURA,
        transport: Transport.TCP,
        options: {
          host: envs.MS_FACTURA_HOST,
          port: envs.MS_FACTURA_PORT,
        },
      },
    ]),
    JwtModule.register({
      secret: envs.JWT_SEED,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController, UsuariosController,ProductosController,FacturaController,CompraController,ReservasController,CarritoController],
  providers: [
    AuthService,
    JwtPassport,
  ],
  exports: [
    ClientsModule,
    AuthService,
    PassportModule,
    JwtModule,
  ],
})
export class AppModule {
  static readonly MS_USER = MS_USER;
  static readonly MS_PRODUCTO = MS_PRODUCTO;
  static readonly MS_FACTURA = MS_FACTURA;
}