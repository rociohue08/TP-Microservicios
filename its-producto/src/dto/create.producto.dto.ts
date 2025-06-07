
//se encarga de validar y definir como se reciben los datos
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  @Min(0)
  stock: number;
}