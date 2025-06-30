//Iniciar ms y tareas programadas 

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductoService } from './producto.service';
import * as cron from 'node-cron';
import { envs} from './config/envs';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = app.get(ProductoService);

  // Ejecutar cada día a la medianoche
  cron.schedule('0 0 * * *', async () => {
    console.log('Limpiando reservas expiradas...');
    await service.limpiarReservasExpiradas();
    console.log('Reservas expiradas eliminadas.');
  });

  await app.listen(3002); // Puerto del MS Productos
  console.info(`Microservicio escuchando desde le puerto: ${envs.PORT}`);

}
bootstrap();