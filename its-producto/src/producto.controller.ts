/*eventos TCP que van a usar los otros ms
*/
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductoService } from './producto.service';
@Controller()
export class ProductoController {
  constructor(private readonly service: ProductoService) {}
//EVENTOS TCP 
  // Valida si hay suficiente stock
  @MessagePattern('validarStock')
  async validarStock(data: { productoId: number; cantidad: number }) {
    return await this.service.validarStock(data.productoId, data.cantidad);
  }

  // Confirma la compra y actualiza el stock
  @MessagePattern('confirmarCompra')
  async confirmarCompra(data: { productoId: number; cantidad: number }) {
    return await this.service.confirmarCompra(data.productoId, data.cantidad);
  }
}