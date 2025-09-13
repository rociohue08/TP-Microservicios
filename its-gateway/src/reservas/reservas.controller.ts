import { Controller, Get, Post, Body, Param, Inject, Delete, Patch, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_PRODUCTO } from '../config/constants';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { BadRequestException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

interface Reserva {
  id: number;
  usuarioId: number;
  productoId: number;
  cantidad: number;
  confirmada: boolean;
  fechaReserva: Date;
}

@Controller('reservas')
export class ReservasController {
  constructor(
    @Inject(MS_PRODUCTO) private readonly productosClient: ClientProxy,
  ) {}

  //Crear reserva
  @Post()
  createReserva(@Body() dto: any) {
    return this.productosClient.send('createReserva', dto);
  }

  //Validar stock
  @Post('validarStock/:productoId')
  validarStock(
    @Param('productoId') productoId: number,
    @Body() body: { cantidad: number },
  ) {
    return this.productosClient.send('validarStock', { 
      productoId, 
      cantidad: body.cantidad 
    });
  }

  //Obtener todas las reservas
  @Get()
  getReservas() {
    return this.productosClient.send<Reserva[]>('getReservas', {});
  }

  //Confirmar reserva
  @UseGuards(JwtAuthGuard)
  @Patch(':id/confirmar')
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

  // Eliminar reserva
  @Delete(':id')
  deleteReserva(@Param('id') id: number) {
    return this.productosClient.send('deleteReserva', { id });
  }
}