
//Este archivo no ejecuta la lógica directamente , sino que la delega al microservicio Productos via TCP.
//midiante el tcp se comunica con el ms productos para buscar productos con el id y verifica qu ehaya stock suficiente
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductoService {
  constructor(
    @Inject('MS_PRODUCTOS') private readonly productClient: ClientProxy,
    @Inject('MS_USUARIOS') private readonly userClient: ClientProxy
  ) {}

  // 🔍 Busca producto por ID desde el MS Productos
  async getProductById(productId: number): Promise<any> {
    try {
      const producto = await firstValueFrom(
        this.productClient.send('findProductById', { id: productId }),
      );

      if (!producto) {
        console.warn(`Producto con ID ${productId} no encontrado`);
        return null;
      }

      console.log('Producto recibido:', producto);
      return producto;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('❌ Error al obtener producto:', errorMessage);
      return null;
    }
  }

  // 🧮 Valida si hay suficiente stock
  async validarStock(productId: number, cantidad: number): Promise<boolean> {
    try {
      const result = await firstValueFrom(
        this.productClient.send('validarStock', { productId, cantidad }),
      );
      return result === true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error validando stock del producto ${productId}:`, errorMessage);
      return false;
    }
  }
}