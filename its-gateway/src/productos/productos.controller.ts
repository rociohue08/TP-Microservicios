import { Controller, Get, Post, Body, Param, Inject, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_PRODUCTO } from '../config/constants';
import { lastValueFrom } from 'rxjs';
import { ApiTags, ApiOperation} from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(
    @Inject(MS_PRODUCTO) private readonly productosClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  create(@Body() dto: any) {
    return this.productosClient.send('createProducto', dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  getAll() {
    return this.productosClient.send('getProductos', {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  async getById(@Param('id') id: number): Promise<any> {
    try {
      const producto = await lastValueFrom(
        this.productosClient.send('getProductoById', { id }),
      );
      return producto;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      return null;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  update(@Param('id') id: number, @Body() changes: any) {
    return this.productosClient.send('updateProducto', { id, changes });
  }
}

