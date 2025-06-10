//Representación de la TABLA en la BASE DE DATOS

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('producto')//nombre de la tabla
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

@Column({ type: 'decimal', precision: 10, scale: 2 })
precio: number;

@Column({ default: 0 })
stock: number;
}