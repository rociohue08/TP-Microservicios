import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

