
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class FacturaService {
  constructor(private prisma: PrismaService) {}

  async crearFactura(data: CreateFacturaDto) {
    if (!data.usuarioId || !Number.isInteger(data.usuarioId)) {
      throw new BadRequestException('ID de usuario inválido');
    }

    if (!Array.isArray(data.items) || data.items.length === 0) {
      throw new BadRequestException('Debe haber al menos un ítem en la factura');
    }

    for (const item of data.items) {
      if (!item.productoId || !Number.isInteger(item.productoId)) {
        throw new BadRequestException(`ID de producto inválido: ${item.productoId}`);
      }
      if (!item.cantidad || !Number.isInteger(item.cantidad) || item.cantidad <= 0) {
        throw new BadRequestException(`Cantidad inválida para producto ${item.productoId}`);
      }
      if (typeof item.precio !== 'number' || item.precio < 0) {
        throw new BadRequestException(`Precio inválido para producto ${item.productoId}`);
      }
    }

    const total = data.items.reduce((suma, item) => suma + item.cantidad * item.precio, 0);

    try {
      const factura = await this.prisma.factura.create({
        data: {
          usuarioId: data.usuarioId,
          total,
          items: data.items as any,
        },
      });

      return { ...factura, items: factura.items as any };
    } catch (error) {
      console.error('Error al crear factura:', error);
      throw error;
    }
  }

  async getFacturas() {
    const facturas = await this.prisma.factura.findMany();
    return facturas.map(f => ({ ...f, items: f.items as any }));
  }

  async getFacturaById(id: number) {
    if (!Number.isInteger(id) || id <= 0) throw new BadRequestException('ID inválido');
    const factura = await this.prisma.factura.findUnique({ where: { id } });
    if (!factura) return null;
    return { ...factura, items: factura.items as any };
  }

  async pagarFactura(facturaId: number, usuarioId: number) {
    const factura = await this.prisma.factura.findUnique({ where: { id: facturaId } });
    if (!factura) throw new RpcException('Factura no encontrada');

  

    return { facturaId, usuarioId, pagada: true };
  }
}
