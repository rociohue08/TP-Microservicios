// ms-user/src/main.ts
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        host: envs.MS_USER_HOST, 
        port: envs.MS_USER_PORT, 
      },
    });

 
    await app.listen();
    console.log(`MS-Usuario escuchando en TCP puerto ${envs.MS_USER_PORT}`);
  } catch (error) {
    console.error(' Error al iniciar el microservicio:', error.message || error);
    process.exit(1);
  }
}

bootstrap();