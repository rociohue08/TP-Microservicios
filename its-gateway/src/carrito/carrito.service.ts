import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { AgregarAlCarritoDto } from './dto/agregar-al-carrito.dto';
import { ReservaResponse } from 'src/interfaces/reserva-response.interface';
@Injectable()
export class CarritoService {
  constructor(
    @Inject('MS_PRODUCTOS') private readonly productClient: ClientProxy,
    @Inject('MS_USUARIOS') private readonly userClient: ClientProxy,
  ) {}

  // Valida stock antes de agregar al carrito
  async validarStock(productId: number, cantidad: number): Promise<boolean> {
    try {
      const result = await firstValueFrom<
        boolean | { error?: string }
      >(this.productClient.send('validarStock', { productId, cantidad }));

      return result === true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error validando stock del producto ${productId}:`, errorMessage);
      return false;
    }
  }

  // Agrega un producto al carrito
  async agregarProducto(usuarioId: number, dto: AgregarAlCarritoDto): Promise<ReservaResponse | { error: string }> {
    const { productoId, cantidad } = dto;

    const isAvailable = await this.validarStock(productoId, cantidad);

    if (!isAvailable) {
      return { error: 'No hay suficiente stock' };
    }

    try {
      const resultado = await firstValueFrom<ReservaResponse>(
        this.userClient.send('agregarAlCarrito', { userId: usuarioId, productId: productoId, cantidad }),
      );

      return resultado;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('❌ Error agregando al carrito:', errorMessage);
      return { error: 'No se pudo agregar al carrito' };
    }
  }
}