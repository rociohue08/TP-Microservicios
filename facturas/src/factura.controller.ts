// import { Controller } from '@nestjs/common';
// import { MessagePattern } from '@nestjs/microservices';
// import { FacturasService } from './factura.service';

// @Controller()
// export class FacturasController {
//   constructor(private readonly facturasService: FacturasService) {}

//   @MessagePattern('getFacturas')
//   getFacturas() {
//     return this.facturasService.findAll();
//   }

//   @MessagePattern('getFacturaById')
//   getFactura(data: { id: number }) {
//     return this.facturasService.findOne(data.id);
//   }
// }


// //Expone endpoints como servicios TCP



import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FacturasService } from './factura.service';

@Controller()
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @MessagePattern('getFacturas')
  getFacturas() {
    return this.facturasService.findAll();
  }

  @MessagePattern('getFacturaById')
  getFactura(data: { id: number }) {
    return this.facturasService.findOne(data.id);
  }

  // Solo para prueba:
  @MessagePattern('createFactura')
  async createFactura(data: any) {
    return await this.facturasService.create(data);
  }
}