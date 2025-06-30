import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { envs } from './config/envs';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    // Conexión a microservicios via TCP
    ClientsModule.register([
      {
        name: 'MS_USER',
        transport: Transport.TCP,
        options: {
          host: envs.MS_USER_HOST,
          port: envs.MS_USER_PORT,
        },
      },
      {
        name: 'MS_PRODUCTO',
        transport: Transport.TCP,
        options: {
          host: envs.MS_PRODUCT_HOST,
          port: envs.MS_PRODUCT_PORT,
        },
      },
      {
        name: 'MS_FACTURAS',
        transport: Transport.TCP,
        options: {
          host: envs.MS_FACTURA_HOST,
          port: envs.MS_FACTURA_PORT,
        },
      },
    ]),

    // Módulos para autenticación JWT
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envs.JWT_SECRET || 'secreto-super-seguro',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
  ],
})
export class AppModule {}