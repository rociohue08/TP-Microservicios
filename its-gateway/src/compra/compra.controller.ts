import { Controller, Post, Inject, UseGuards, Request, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_PRODUCTO, MS_FACTURA, MS_USER } from '../config/constants';
import { lastValueFrom } from 'rxjs';
import { Producto } from 'src/interfaces/productoInterface';
import { FacturaItem, Factura } from 'src/interfaces/factura.interface';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { payloadInterface } from 'src/interfaces/PayloadInterfece';
import { CarritoItem } from 'src/interfaces/carrito.interface';

@Controller('compra')
export class CompraController {
  constructor(
    @Inject(MS_PRODUCTO) private readonly productoClient: ClientProxy,
    @Inject(MS_FACTURA) private readonly facturaClient: ClientProxy,
    @Inject(MS_USER) private readonly usuarioClient: ClientProxy,
  ) {}

  // Confirmar la compra y crear la factura
  @UseGuards(JwtAuthGuard)
  @Post('confirmar')
  async confirmarCompra(@Request() req: { user: payloadInterface }) {
    const usuarioId = req.user.userId;

    try {
      //Obtener carrito
      const carrito: CarritoItem[] = await lastValueFrom(
        this.usuarioClient.send<CarritoItem[]>('getCarrito', { usuarioId }),
      );

      if (!carrito || carrito.length === 0) {
        throw new Error('El carrito está vacío');
      }

      const items: FacturaItem[] = [];

      // Crear reservas para cada producto
      for (const item of carrito) {
        const producto: Producto = await lastValueFrom(
          this.productoClient.send<Producto>('getProductoById', { id: item.productoId }),
        );

        await lastValueFrom(
          this.productoClient.send('createReserva', {
            usuarioId,
            productoId: item.productoId,
            cantidad: item.cantidad,
          }),
        );

        items.push({
          productoId: item.productoId,
          cantidad: item.cantidad,
          precio: Number(producto.precio),
        });
      }

      //Crear factura
      const factura: Factura = await lastValueFrom(
        this.facturaClient.send<Factura>('crearFactura', {
          usuarioId: Number(usuarioId),
          items: items.map(i => ({
            productoId: Number(i.productoId),
            cantidad: Number(i.cantidad),
            precio: Number(i.precio),
          })),
        }),
      );

      if (!factura || !factura.id) {
        throw new Error('No se pudo crear la factura');
      }

      // Limpiar carrito
      await lastValueFrom(
        this.usuarioClient.send('limpiarCarrito', { usuarioId }),
      );

      return {
        message: 'Compra realizada con éxito. Confirma el pago para completar.',
        total: items.reduce((sum, item) => sum + item.cantidad * item.precio, 0),
        items,
        facturaId: factura.id,
      };
    } catch (rawError) {
      const mensaje = rawError instanceof Error ? rawError.message : String(rawError);
      console.error(' [Compra] Error en confirmarCompra:', mensaje);
      if (rawError instanceof Error && rawError.stack) {
        console.error(' [Compra] Stack:', rawError.stack);
      }
      throw rawError;
    }
  }

  // Confirmar el pago de la factura
  @UseGuards(JwtAuthGuard)
  @Post('pagar/:facturaId')
  async pagarCompra(
    @Param('facturaId') facturaId: number,
    @Request() req: { user: payloadInterface },
  ) {
    const usuarioId = req.user.userId;

    try {
      const result = await lastValueFrom(
        this.facturaClient.send('pagarFactura', { facturaId: Number(facturaId), usuarioId }),
      );

      return {
        message: 'Pago confirmado correctamente',
        facturaId,
        estado: 'pagada',
        result,
      };
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : String(error);
      console.error(' [Compra] Error en pagarCompra:', mensaje);
      throw error;
    }
  }
}


