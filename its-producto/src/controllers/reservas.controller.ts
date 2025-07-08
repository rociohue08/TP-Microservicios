import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CreateReservaDto } from 'src/dto/create-reserva.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() dto: CreateReservaDto) {
    const isAvailable = await this.appService.validarStock(dto.productoId, dto.cantidad);

    if (!isAvailable) {
      return { error: 'No hay suficiente stock para esta reserva' };
    }

    return await this.appService.crearReserva(dto);
  }
}