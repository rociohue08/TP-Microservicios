


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const httpServer = await NestFactory.create(AppModule);
  await httpServer.listen(3001);
  console.log('HTTP server running on http://localhost:3001');

  const tcpServer = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4001,
      },
    }
  );
  await tcpServer.listen();
  console.log('TCP microservice running on port 4001');
}

bootstrap();