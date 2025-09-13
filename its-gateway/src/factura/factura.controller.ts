import { Controller, Get, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_FACTURA } from '../config/constants';
import { lastValueFrom } from 'rxjs';
import { Factura } from 'src/interfaces/factura.interface';
@Controller('facturas')
export class FacturaController {
  constructor(
    @Inject(MS_FACTURA) private readonly facturaClient: ClientProxy,
  ) {}

  @Get()
  async getFacturas() {
    return lastValueFrom(
      this.facturaClient.send<Factura[]>('getFacturas', {}),
    );
  }

  @Get(':id')
  async getFacturaById(@Param('id') id: number) {
    return lastValueFrom(
      this.facturaClient.send<Factura>('getFacturaById', id),
    );
  }
}