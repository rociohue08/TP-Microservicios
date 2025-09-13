//cada producto q se compro
export interface FacturaItem {
  productoId: number;
  cantidad: number;
  precio: number;
}

//estructura de la factura
export interface Factura {
  id: number;
  usuarioId: number;
  total: number;
  fecha: Date; 
  items: FacturaItem[];
}
