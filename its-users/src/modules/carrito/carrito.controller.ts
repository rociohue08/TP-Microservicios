import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CarritoService } from './carrito.service';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @MessagePattern('agregarAlCarrito')
  async agregarAlCarrito(@Payload() data: { userId: number, productId: number, cantidad: number }) {
    return this.carritoService.agregarAlCarrito(data.userId, data.productId, data.cantidad);
  }
  
  @MessagePattern('getCarrito')
  async getCarrito(@Payload() data: { userId: number }) {
    return this.carritoService.getCarrito(data.userId);
  }

  @MessagePattern('limpiarCarrito')
  async limpiarCarrito(@Payload() data: { userId: number }) {
    return this.carritoService.limpiarCarrito(data.userId);
  }
}