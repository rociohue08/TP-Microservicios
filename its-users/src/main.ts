import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
async function bootstrap() {
  // 🔧 1. Iniciar servidor HTTP (rutas REST)
  const httpApp = await NestFactory.create(AppModule);
  await httpApp.listen(4001); // ← Puerto para Postman y frontend
  console.log('HTTP server running on http://localhost:4001');

  // ⚙️ 2. Iniciar microservicio TCP (comunicación entre servicios)
  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001, // ← Puerto para comunicación interna (Gateway)
      },
    }
  );
  await tcpApp.listen();
  console.log('TCP microservice running on port 3001');
}

bootstrap();