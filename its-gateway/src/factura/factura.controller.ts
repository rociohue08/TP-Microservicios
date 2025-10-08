import { Controller, Get, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MS_FACTURA } from '../config/constants';
import { lastValueFrom } from 'rxjs';
import { Factura } from 'src/interfaces/factura.interface';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Facturas')
@Controller('facturas')
export class FacturaController {
  constructor(
    @Inject(MS_FACTURA) private readonly facturaClient: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las facturas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de facturas obtenida exitosamente',
  })
  async getFacturas() {
    return lastValueFrom(
      this.facturaClient.send<Factura[]>('getFacturas', {}),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la factura',
    example: 8,
  })
  @ApiResponse({
    status: 200,
    description: 'Factura obtenida correctamente',
  })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  async getFacturaById(@Param('id') id: number) {
    return lastValueFrom(
      this.facturaClient.send<Factura>('getFacturaById', id),
    );
  }
}
