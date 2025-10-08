import { Controller, Post, Body, Inject, Get, Request, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_USER } from '../config/constants';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { payloadInterface } from 'src/interfaces/PayloadInterfece';
import { CarritoItem } from 'src/interfaces/carrito.interface';
import { MessageResponse } from 'src/interfaces/message-response.interface'; 
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth  } from '@nestjs/swagger';


@ApiTags('Carrito')
@ApiBearerAuth()
@Controller('carrito')
export class CarritoController {
  constructor(
    @Inject(MS_USER) private readonly usuarioClient: ClientProxy,
  ) { }

  // Agrega un producto al carrito
  @UseGuards(JwtAuthGuard)
  @Post()

   @ApiOperation({ summary: 'Agregar un producto al carrito' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productId: { type: 'number', example: 1 },
        cantidad: { type: 'number', example: 3 },
      },
      required: ['productId', 'cantidad'],
    },
  })
  @ApiResponse({ status: 201, description: 'Producto agregado al carrito' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })

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

  @ApiOperation({ summary: 'Obtener el carrito del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Carrito del usuario' })

  async getCarrito(@Request() req: { user: payloadInterface }): Promise<CarritoItem[]> {
    const usuarioId = req.user.userId;
    return lastValueFrom<CarritoItem[]>(
      this.usuarioClient.send('getCarrito', { usuarioId }),
    );
  }

  // Limpia el carrito después de la compra
  @UseGuards(JwtAuthGuard)
  @Post('limpiar')

  @ApiOperation({ summary: 'Vaciar el carrito del usuario' })
  @ApiResponse({ status: 200, description: 'Carrito limpiado exitosamente' })

  async limpiarCarrito(@Request() req: { user: payloadInterface }): Promise<void> {
    const usuarioId = req.user.userId;
    await lastValueFrom(
      this.usuarioClient.send('limpiarCarrito', { usuarioId }),
    );
  }
}