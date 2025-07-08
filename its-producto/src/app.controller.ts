import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ValidateStockDto } from './dto/validate-stock.dto';
import { FindProductoDto } from './dto/find-producto.dto';
import { Producto } from './entities/producto.entity';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

   @MessagePattern('findProductById')
  async findProductById(@Payload() data: FindProductoDto): Promise<Producto | null> {
    return await this.appService.findProductById(data.id);
  }

  @MessagePattern('validarStock')
  async validarStock(@Payload() data: ValidateStockDto) {
    return await this.appService.validarStock(data.productId, data.cantidad);
  }




}