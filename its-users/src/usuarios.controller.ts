//define las rutas http que puedes llamar desde postman o tu frontend 

import { Controller, Post, Body } from '@nestjs/common';
import { CreateUsuarioDto } from './dtos/usuario.dto';
import { AppService } from './app.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async register(@Body() dto: CreateUsuarioDto) {
    console.log('Datos recibidos:', dto);
    return await this.appService.registrarUsuario(dto);
  }
}