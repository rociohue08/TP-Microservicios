import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Importa tus variables de entorno
import { envs } from './config/envs';
// Auth
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtPassport } from './auth/jwt.passport';

// Definimos MS_USER una vez y lo reusamos
const MS_USER = 'MS_USER';
const MS_PRODUCTO = 'MS_PRODUCTO';
const MS_FACTURA = 'MS_FACTURA';

@Module({
  imports: [
    // Comunicación con microservicios via TCP
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

    // Módulo JWT
    JwtModule.register({
      secret: envs.JWT_SEED,
      signOptions: { expiresIn: '1h' }, // Token expira en 1 hora
    }),


    // Passport para autenticación
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtPassport,
  ],
  exports: [
    ClientsModule, // Exportamos los clientes para otros módulos
    AuthService,   // Si otros servicios necesitan auth
    PassportModule, 
    JwtModule, 
  ],
})
export class AppModule {
  static readonly MS_USER = MS_USER;     // Exponemos las constantes
  static readonly MS_PRODUCTO = MS_PRODUCTO;
  static readonly MS_FACTURA = MS_FACTURA;
}