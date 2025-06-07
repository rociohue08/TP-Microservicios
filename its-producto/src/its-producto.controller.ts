/*controller, recibe solicitudes http y devuelve respuestas 
aca solo se pasan los datos al servicio y es este quien tiene la logica 
real dell guardado
*/
import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ItsProductoService } from './its-producto.service';
import { CreateProductoDto } from './dto/create.producto.dto';

@Controller('products') // Define la ruta base para todas las operaciones
export class ItsProductoController {
  constructor(private readonly itsProductoService: ItsProductoService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductoDto) {
    return await this.itsProductoService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.itsProductoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itsProductoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<CreateProductoDto>,
  ) {
    return await this.itsProductoService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.itsProductoService.remove(id);
  }
}