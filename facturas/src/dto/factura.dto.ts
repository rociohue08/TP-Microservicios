export class FacturaDto {
  id: number;
  usuarioId: number;
  total: number;
  productos: { productoId: number; cantidad: number }[];
  fecha: Date;
}