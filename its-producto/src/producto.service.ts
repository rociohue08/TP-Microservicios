import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Reserva } from './entities/reserva.entity';


//LOGICA VALIDAR STOCK, CONFIRMAR COMPRA, LIMPIAR RESERVAS EXPIRADAS
@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto) private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Reserva) private readonly reservaRepo: Repository<Reserva>
  ) {}

  // Verifica si hay suficiente stock
  async validarStock(productoId: number, cantidad: number): Promise<boolean> {
    const producto = await this.productoRepo.findOneBy({ id: productoId });
    if (!producto) throw new Error('Producto no encontrado');

    const reservasActivas = await this.reservaRepo.count({
      where: { productoId, confirmada: false },
    });

    const stockDisponible = producto.stock - reservasActivas;

    return stockDisponible >= cantidad;
  }

  // Confirma la compra
  async confirmarCompra(productoId: number, cantidad: number): Promise<void> {
    const producto = await this.productoRepo.findOneBy({ id: productoId });
    if (!producto || producto.stock < cantidad) {
      throw new Error('No hay suficiente stock');
    }

    // Crear una reserva confirmada
    await this.reservaRepo.save({
      productoId,
      usuarioId: 0, // Puedes pasarlo como parámetro si lo necesitas
      cantidad,
      confirmada: true,
      fechaReserva: new Date(),
    });

    // Actualizar stock
    producto.stock -= cantidad;
    await this.productoRepo.save(producto);
  }

// Limpiar reservas expiradas
  async limpiarReservasExpiradas() {
    const tresDiasAtras = new Date();
    tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);

    const reservasExpiradas = await this.reservaRepo.find({
      where: {
        fechaReserva: tresDiasAtras,
        confirmada: false,
      },
    });

    for (const reserva of reservasExpiradas) {
      await this.reservaRepo.delete(reserva.id);
    }
    
}
}