export class CreateFacturaDto {
  usuarioId: number;
  items: { 
    productoId: number; 
    cantidad: number; 
    precio: number 
  }[];
}
