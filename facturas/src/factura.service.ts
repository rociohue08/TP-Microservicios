import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class FacturasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.factura.findMany({
      include: { productos: true }
    });
  }

  async findOne(id: number) {
    return await this.prisma.factura.findUnique({
      where: { id },
      include: { productos: true }
    });
  }
}
//solo consulta datos