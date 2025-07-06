import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { usuarioDto } from 'src/dtos/usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async registrarUsuario(@Body() dto: usuarioDto) {
    return await this.appService.registrarUsuario(dto);
  }
}


/*El registro debe ir en un endpoint HTTP público , no en el AppController que maneja eventos TCP para microservicios.
➡️ El archivo AppController se encarga de eventos internos entre microservicios (TCP)
➡️ Pero para registrar usuarios, usas una ruta pública */