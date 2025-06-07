import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from './config/envs';

@Module({
  controllers: [AppController],
  imports: [
    ClientsModule.register([ //para conectar con los microservicios
      {
        name: 'MS_USER',
        transport: Transport.TCP,
        options: {
          host: envs.MS_USER_HOST,
          port: envs.MS_USER_PORT,
        },
      },
      {
        name:'products-service',
        transport: Transport.TCP,
        options:{
          host: envs.MS_PRODUCT_HOST,
          port:envs.MS_PRODUCT_PORT,
        },
      
      },

    ]),
  ],
})
export class AppModule {}
