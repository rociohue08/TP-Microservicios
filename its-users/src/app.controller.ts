//Este archivo define los eventos que puede recibir el microservicio.
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { LoginDto } from './dtos/loginDto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Evento 'validarUsuario' – Recibe email y contraseña desde el Gateway
 @MessagePattern('validarUsuario')
async validateUser(@Payload() data: LoginDto): Promise<any> {
  return await this.appService.validateUser(data.email, data.contraseña);
}

  // Opcional: Buscar usuario por ID (para validación JWT)
  @MessagePattern('findUserById')
  async findUserById(@Payload('id') id: number): Promise<any> {
    return await this.appService.findUserById(id);
  }
}