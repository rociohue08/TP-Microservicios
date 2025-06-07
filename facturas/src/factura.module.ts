import { Module } from '@nestjs/common';
import { AppController } from './factura.controller';
import { AppService } from './factura.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
