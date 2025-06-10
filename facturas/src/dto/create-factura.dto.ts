export class CreateFacturaDto {
  usuarioId: number;
  total: number;
  productos: { productoId: number; cantidad: number }[];
}