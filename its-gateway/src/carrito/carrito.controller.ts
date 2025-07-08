import { Controller, Post, Body } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CarritoService } from './carrito.service';
import { AgregarAlCarritoDto } from './dto/agregar-al-carrito.dto';
import { User } from 'src/interfaces/usuario.interface';
@Controller('carrito')
@UseGuards(JwtAuthGuard)
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post('agregar')
  async agregar(@Body() dto: AgregarAlCarritoDto, @User() user: User) {
    const usuarioId = user.id; // ← Usa 'id' en lugar de 'userId'
    return await this.carritoService.agregarProducto(usuarioId, dto);
  }
}