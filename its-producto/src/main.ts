import { NestFactory } from '@nestjs/core';
import { ProductoModule } from './producto.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Servidor HTTP para rutas REST
  const httpApp = await NestFactory.create(ProductoModule);
  

  await httpApp.listen(4002); // Puerto para rutas REST
  console.log('HTTP server running on http://localhost:4002');

  // Microservicio TCP para comunicación interna
  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductoModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3002, // Puerto interno para eventos TCP
      },
    }
  );
  await tcpApp.listen();
  console.log('TCP microservicio corriendo en puerto 3002');
}

bootstrap();