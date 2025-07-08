import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Servidor HTTP para rutas REST
  const httpApp = await NestFactory.create(AppModule);
  

  await httpApp.listen(4002); // Puerto para rutas REST
  console.log('HTTP server running on http://localhost:4002');

  // Microservicio TCP para comunicación interna
  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3002, // ← Puerto interno para eventos TCP
      },
    }
  );
  await tcpApp.listen();
  console.log('TCP microservice running on port 3002');
}

bootstrap();