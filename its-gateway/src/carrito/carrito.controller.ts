import { Controller, Post, Body, Inject, Get, Request, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_USER } from '../config/constants';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { payloadInterface } from 'src/interfaces/PayloadInterfece';
import { CarritoItem } from 'src/interfaces/carrito.interface';
import { MessageResponse } from 'src/interfaces/message-response.interface'; 

@Controller('carrito')
export class CarritoController {
  constructor(
    @Inject(MS_USER) private readonly usuarioClient: ClientProxy,
  ) { }

  // Agrega un producto al carrito
  @UseGuards(JwtAuthGuard)
  @Post()
  async agregarAlCarrito(
    @Body() data: { productId: number; cantidad: number },
    @Request() req: { user: payloadInterface }
  ): Promise<MessageResponse> { 
    const userId = req.user.userId;
    return await lastValueFrom<MessageResponse>( 
      this.usuarioClient.send('agregarAlCarrito', { ...data, userId }),
    );
  }

  // Obtiene el carrito del usuario autenticado
  @UseGuards(JwtAuthGuard)
  @Get()
  async getCarrito(@Request() req: { user: payloadInterface }): Promise<CarritoItem[]> {
    const usuarioId = req.user.userId;
    return lastValueFrom<CarritoItem[]>(
      this.usuarioClient.send('getCarrito', { usuarioId }),
    );
  }

  // Limpia el carrito después de la compra
  @UseGuards(JwtAuthGuard)
  @Post('limpiar')
  async limpiarCarrito(@Request() req: { user: payloadInterface }): Promise<void> {
    const usuarioId = req.user.userId;
    await lastValueFrom(
      this.usuarioClient.send('limpiarCarrito', { usuarioId }),
    );
  }
}