import {Controller, Get, Post, Body, Param, Inject,Patch} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_PRODUCTO} from '../config/constants';
import { lastValueFrom } from 'rxjs';


@Controller('productos')
export class ProductosController {
  constructor(
    @Inject(MS_PRODUCTO) private readonly productosClient: ClientProxy,
  ) {}

@Post()
create(@Body() dto: any) {
  return this.productosClient.send('createProducto', dto);
}

@Get()
getAll() {
  return this.productosClient.send('getProductos', {});
}

@Get(':id') 
async getById(@Param('id') id: number): Promise<any> {   /*@param extrae el valor del id  */
  try {
    const producto = await lastValueFrom( 

      this.productosClient.send('getProductoById', { id }),
    );
    console.log('Producto encontrado:', producto);
    return producto;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    console.log('Producto no encontrado:', id);
    return null;
  }
}

  @Patch(':id')
  update(@Param('id') id: number, @Body() changes: any) {
    return this.productosClient.send('updateProducto', { id, changes });
  }

  @Post('reservas')
  createReserva(@Body() dto: any) {
    return this.productosClient.send('createReserva', dto);
  }

  @Get('reservas')
  async getReservas() {
    await lastValueFrom(
      this.productosClient.send('getReservas', {}),
    );
  }
}
