import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsuarioService } from './usuario.service';
import { usuarioDto } from './dtos/usuario.dto';
import { LoginDto } from 'src/dtos/loginDto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Login
  @MessagePattern('validarUsuario')
  async validateUser(
    @Payload('email') email: string, 
    @Payload('contraseña') contraseña: string
  ) {
    return this.usuarioService.validateUser(email, contraseña);
  }

  @MessagePattern('registrarUsuario')
  async registrarUsuario(@Payload() dto: usuarioDto) {
    return this.usuarioService.registrarUsuario(dto);
  }

  @MessagePattern('findUserById')
  async findUserById(@Payload('id') id: number) {
    return this.usuarioService.findUserById(id);
  }

  @MessagePattern('getUsuarios')
  async getUsuarios() {
    return this.usuarioService.getUsuarios();
  }
}