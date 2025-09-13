import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_USER } from '../config/constants';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    @Inject(MS_USER) private readonly usersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() dto: any) {
    console.log(' [UsuariosController] Enviando a registrarUsuario:', dto);
    return this.usersClient.send('registrarUsuario', dto);
  }
  
  @Get()
  getAll() {
    return this.usersClient.send('getUsuarios', {});
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.usersClient.send('findUserById', { id });
  }
}