import { Controller, Get, Post, Body, Param, Inject, Delete, Patch, UseGuards, BadRequestException,ParseIntPipe} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_PRODUCTO } from '../config/constants';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { lastValueFrom } from 'rxjs';
import { ApiTags, ApiOperation,ApiBearerAuth} from '@nestjs/swagger';


interface Reserva {
  id: number;
  usuarioId: number;
  productoId: number;
  cantidad: number;
  confirmada: boolean;
  fechaReserva: Date;
}

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    stock_reservado: number;
}

@ApiTags('Reservas')
@ApiBearerAuth()
@Controller('reservas')
export class ReservasController {
  constructor(
    @Inject(MS_PRODUCTO) private readonly productosClient: ClientProxy,
  ) {}

  // crear reserva
  @Post()
  @ApiOperation({ summary: 'Crear una nueva reserva' })
  createReserva(@Body() dto: any) {
    return this.productosClient.send('createReserva', dto);
  }

  // obtener todas las reservas
  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  getReservas() {
    return this.productosClient.send<Reserva[]>('getReservas', {});
  }

 @Get('stock-disponible/:productoId')
    @ApiOperation({ summary: 'Consultar stock disponible de un producto (stock - stock_reservado) con id del producto' })
    async getStockDisponible(
        @Param('productoId', ParseIntPipe) productoId: number, 
    ): Promise<{ productoId: number, stockDisponible: number }> {
        
        try {
            //paso la interfaz deproducto
            const producto: Producto = await lastValueFrom<Producto>(
                this.productosClient.send<Producto>('getProductoById', { id: productoId }),
            );

            
            if (!producto || producto.stock === undefined || producto.stock_reservado === undefined) {
                throw new BadRequestException('Producto no encontrado');
            }

            // Cálculo 
            const stockDisponible = producto.stock - producto.stock_reservado;

            return { 
                productoId: productoId, 
                stockDisponible: stockDisponible 
            };
            
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            console.error('Error al obtener producto desde MS:', error);
            throw new BadRequestException('No se pudo obtener la información de stock del producto.');
        }
    }
    
  @UseGuards(JwtAuthGuard)
  @Patch(':id/confirmar')
  @ApiOperation({ summary: 'Confirmar una reserva' })
  async confirmarReserva(@Param('id') id: string): Promise<Reserva> {
    const reservaId = parseInt(id, 10);
    if (isNaN(reservaId)) {
      throw new BadRequestException('ID inválido');
    }
    try {
      const resultado: Reserva = await lastValueFrom<Reserva>(
        this.productosClient.send<Reserva>('confirmarReserva', { id: reservaId })
      );
      return resultado;
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error al confirmar reserva:', mensaje);
      throw new BadRequestException(`No se pudo confirmar la reserva: ${mensaje}`);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reserva' })
  deleteReserva(@Param('id') id: number) {
    return this.productosClient.send('deleteReserva', { id });
  }
}

