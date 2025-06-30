import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('validateUser')
  async validateUser(data: any) {
    return await this.appService.validateUser(data.email, data.contraseña);
  }

}