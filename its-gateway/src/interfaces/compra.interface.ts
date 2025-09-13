import { FacturaItem } from './factura.interface';

export interface Compra {
  usuarioId: number;
  items: FacturaItem[];
}