import { Module } from "@nestjs/common";
import { AppService} from "./app.service";
import { PrismaService } from "src/prisma.service";
import { AppController } from "./app.controller";
import { UsuariosController } from "./controllers/usuarios.controller";
import { AgregarAlCarritoDto } from "./dtos/agregar-al-carrito.dto";

@Module ({
    imports:[],
    controllers:[AppController,UsuariosController],
    providers:[AppService, PrismaService],

})

export  class AppModule{}