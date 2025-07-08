//Este archivo define los eventos que puede recibir el microservicio
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { LoginDto } from './dtos/loginDto';
import { ReservaResponse } from './dtos/reservaResponse.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 @MessagePattern('validarUsuario')
async validateUser(@Payload() data: LoginDto): Promise<any> {
  return await this.appService.validateUser(data.email, data.contraseña);
}

  @MessagePattern('findUserById')
  async findUserById(@Payload('id') id: number): Promise<any> {
    return await this.appService.findUserById(id);
  }

 @MessagePattern('agregarAlCarrito')
async agregarAlCarrito(@Payload() data: any): Promise<ReservaResponse> {
  const { userId, productId, cantidad } = data;

  const resultado = await this.appService.agregarAlCarrito(userId, productId, cantidad);

  // Devuelve solo los campos necesarios
  return {
    usuarioId: resultado.usuarioId,
    productoId: resultado.productoId,
    cantidad: resultado.cantidad,
    fechaAgregado: resultado.fechaAgregado,
  };
}
}
