import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductoModule } from 'src/producto.module';
import { CronService } from './cron.service';
@Module({
  imports: [ScheduleModule.forRoot(), ProductoModule], 
  providers: [CronService],
})
export class CronModule {}