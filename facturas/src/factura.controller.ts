
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { FacturaService } from './factura.service';

@Controller()
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @MessagePattern('crearFactura')
  crearFactura(@Payload() data: CreateFacturaDto) {
    return this.facturaService.crearFactura(data);
  }

  @MessagePattern('getFacturas')
  getFacturas() {
    return this.facturaService.getFacturas();
  }

  @MessagePattern('getFacturaById')
  getFacturaById(@Payload() id: number) {
    return this.facturaService.getFacturaById(id);
  }

  @MessagePattern('pagarFactura')
  pagarFactura(@Payload() data: { facturaId: number; usuarioId: number }) {
    return this.facturaService.pagarFactura(data.facturaId, data.usuarioId);
  }
}
