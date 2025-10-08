import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('API GATEWAY - app de compra')
    .setDescription('Documentación de los endpoints del Gateway (puerto 3000)')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }) 

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.info(`Gateway escuchando desde el puerto: ${envs.PORT}`);
  await app.listen(envs.PORT);
}
bootstrap();
