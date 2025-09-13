import { Injectable } from '@nestjs/common';
import { CarritoItem } from 'src/interfaces/carrito-item.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarritoService {
  constructor(private prisma: PrismaService) {}

  async agregarAlCarrito(userId: number, productId: number, cantidad: number) {
    try {
      const carrito = await this.prisma.carrito.findUnique({
        where: {
          usuarioId_productoId: {
            usuarioId: userId,
            productoId: productId,
          },
        },
      });

      if (carrito) {
        return await this.prisma.carrito.update({
          where: {
            usuarioId_productoId: {
              usuarioId: userId,
              productoId: productId,
            },
          },
          data: { cantidad: carrito.cantidad + cantidad },
        });
      } else {
        return await this.prisma.carrito.create({
          data: {
            usuarioId: userId,
            productoId: productId,
            cantidad,
          },
        });
      }
    } catch (error) {
      console.error('Error en agregarAlCarrito:', error.message);
      throw new Error('No se pudo agregar al carrito');
    }
  }

  async getCarrito(userId: number): Promise<CarritoItem[]> {
    const carrito = await this.prisma.carrito.findMany({
      where: { usuarioId: userId },
      select: {
        productoId: true,
        cantidad: true,
      },
    });
    return carrito;
  }

  async limpiarCarrito(userId: number): Promise<{ ok: boolean }> {
    await this.prisma.carrito.deleteMany({
      where: { usuarioId: userId },
    });
    return { ok: true }; //  lastValueFrom necesita que emita un valor
  }
}
