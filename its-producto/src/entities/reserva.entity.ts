import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@Entity('reserva')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  productoId: number;

  @Column()
  cantidad: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaReserva: Date;

  @Column({ default: false })
  confirmada: boolean;
}

//tipo: timestamp almacena fecha y hora en formato utc ej:2025-04-05 12:30:00
// timestamp != datetime. se puede usar cualquiera 
//timestamp MySQL, PostgreSQL, etc. Almacena fecha y hora, suele usar zona horaria UTC.
//datetime MySQL, SQLite, etc. También almacena fecha y hora, pero no siempre se convierte a UTC.