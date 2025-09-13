
import { NestFactory } from '@nestjs/core';
import { envs } from './config/envs';
import { FacturaModule } from './factura.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FacturaModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: envs.PORT,
      },
    },
  );

  console.log(`Microservicio escuchando en puerto ${envs.PORT}`);
  await app.listen();
}
bootstrap();