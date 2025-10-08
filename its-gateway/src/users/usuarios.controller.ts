import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_USER } from '../config/constants';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(
    @Inject(MS_USER) private readonly usersClient: ClientProxy,
  ) {}

  @Post()
 @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ schema: { type: 'object', properties: { nombre: { type: 'string' }, apellido: { type: 'string' },email: { type: 'string' }, contraseña: { type: 'string' }, rol:{type:'string'}}, required: ['nombre', 'apellido','email', 'contraseña','rol'] } })
  @ApiResponse({ status: 201, description: 'Usuario registrado' })

  create(@Body() dto: any) {
    console.log(' [UsuariosController] Enviando a registrarUsuario:', dto);
    return this.usersClient.send('registrarUsuario', dto);
  }
  
  @Get()
 @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })

  getAll() {
    return this.usersClient.send('getUsuarios', {});
  }

  @Get(':id')
@ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })

  getById(@Param('id') id: number) {
    return this.usersClient.send('findUserById', { id });
  }
}