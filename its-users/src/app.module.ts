import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService} from "./app.service";
import { PrismaService } from "src/prisma.service";
import { UsuariosController } from "./usuarios.controller";

@Module ({
    imports:[],
    controllers:[AppController,UsuariosController],
    providers:[AppService, PrismaService],

})

export  class AppModule{}