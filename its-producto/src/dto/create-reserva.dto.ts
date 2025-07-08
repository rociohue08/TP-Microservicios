import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservaDto {
  @IsNumber()
  @Type(() => Number)
  usuarioId: number;

  @IsNumber()
  @Type(() => Number)
  productoId: number;

  @IsNumber()
  @Type(() => Number)
  cantidad: number;
}