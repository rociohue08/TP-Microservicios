import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { productoService } from './producto.service';
import { CreateProductoDto } from './dto/create-product.dto';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Controller()
export class ProductoController {
  constructor(private readonly appService: productoService) { }

  // Crear producto
  @MessagePattern('createProducto')
  async create(@Payload() dto: CreateProductoDto) {
    return await this.appService.createProducto(dto);
  }

  // Listar productos
  @MessagePattern('getProductos')
  async getAll() {
    return await this.appService.findAll();
  }

  // Buscar producto por ID
  @MessagePattern('getProductoById')
  async getById(@Payload() data: { id: number }) {
    return await this.appService.findProductById(data.id);
  }

  // Actualizar producto
  @MessagePattern('updateProducto')
  async update(@Payload() data: { id: number; changes: Partial<CreateProductoDto> }) {
    return await this.appService.updateProducto(data.id, data.changes);
  }

  // Crear reserva
  @MessagePattern('createReserva')
  async createReserva(@Payload() dto: CreateReservaDto) {
    return await this.appService.crearReserva(dto);
  }

  // Validar stock
  @MessagePattern('validarStock')
  async validarStock(@Payload() data: { productoId: number; cantidad: number }) {
    return await this.appService.validarStock(data.productoId, data.cantidad);
  }

  // Obtener reservas
  @MessagePattern('getReservas')
  async getReservas() {
    return await this.appService.getReservas();
  }

  //confirmarreserva
  @MessagePattern('confirmarReserva')
async confirmarReserva(@Payload() data:  { id: number }) {
  return await this.appService.confirmarReserva(data.id);
}

//eliminar reserva
  @MessagePattern('deleteReserva')
  async deleteReserva(@Payload() data: { id: number }) {
    return await this.appService.deleteReserva(data.id);
  }

  // finalizar compra
   @MessagePattern('finalizarCompra')
  async finalizarCompra(@Payload() data: { items: any[] }) {
    return await this.appService.finalizarCompra(data.items);
  }
}