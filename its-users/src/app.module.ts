import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { CarritoModule } from './modules/carrito/carrito.module';
import { PrismaService } from './prisma.service';
import { envs } from './config/envs';           
import { MS_PRODUCTO } from './config/constants'; 

@Module({
  imports: [
    UsuarioModule,
    CarritoModule,
 
    ClientsModule.register([
      {
        name: MS_PRODUCTO,
        transport: Transport.TCP,
        options: {
          host: envs.MS_PRODUCTO_HOST,
          port: envs.MS_PRODUCTO_PORT,
        },
      },
    ]),
  ],
  providers: [PrismaService],
  exports: [PrismaService, ClientsModule], 
})
export class AppModule {}