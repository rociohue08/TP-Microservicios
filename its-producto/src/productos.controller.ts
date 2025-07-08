import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProductoDto } from './dto/create-product.dto';
@Controller('productos')
export class ProductosController {
  constructor(private readonly appService: AppService) {}

  // ✅ Crear nuevo producto
@Post()
async create(@Body() dto: CreateProductoDto) {
  if (!dto.nombre || typeof dto.precio !== 'number') {
    return { error: 'Nombre y precio son obligatorios' };
  }

  return await this.appService.createProducto(dto);
}
  // ✅ Listar todos los productos
  @Get()
  async findAll() {
    return await this.appService.findAll();
  }

  // ✅ Buscar producto por ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const producto = await this.appService.findProductById(id);

    if (!producto) {
      return { error: 'Producto no encontrado' };
    }

    return producto;
  }

  // ✅ Actualizar stock o datos del producto
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: Partial<CreateProductoDto>) {
    return await this.appService.updateProducto(id, dto);
  }
}