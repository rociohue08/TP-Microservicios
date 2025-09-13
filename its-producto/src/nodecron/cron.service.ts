import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { productoService } from 'src/producto.service';
@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly productoService: productoService) {}

  // Este cron se ejecuta cada minuto (*/1 * * * *) para pruebas
  @Cron('*/1 * * * *')
  async handleCron() {
    this.logger.log('Iniciando tarea programada para limpiar reservas antiguas.');
    await this.productoService.eliminarReservasCaducadas();
    this.logger.log('Tarea de limpieza de reservas terminada.');
  }
}