// its-productos/src/producto.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Reserva } from './entities/reserva.entity';
import { CreateProductoDto } from './dto/create-product.dto';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Injectable()
export class productoService {
  constructor(
    @InjectRepository(Producto) private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Reserva) private readonly reservaRepo: Repository<Reserva>,
  ) {}

  async createProducto(productoDto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepo.create(productoDto);
    return await this.productoRepo.save(producto);
  }

  async findAll() {
    return await this.productoRepo.find();
  }

  async findProductById(id: number): Promise<Producto> {
    const producto = await this.productoRepo.findOneBy({ id });
    if (!producto) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  async updateProducto(id: number, data: Partial<Producto>) {
    await this.productoRepo.update(id, data);
    return await this.productoRepo.findOneBy({ id });
  }

  async validarStock(productId: number, cantidad: number): Promise<boolean> {
    const producto = await this.productoRepo.findOneBy({ id: productId });
    if (!producto) return false;
    
  const stockDisponible = producto.stock - producto.stock_reservado;
    console.log(` Validando stock para producto ${productId}:`);
    console.log(`  Stock total: ${producto.stock}`);
    console.log(`  Stock reservado: ${producto.stock_reservado}`);
    console.log(`  Disponible: ${stockDisponible}, Solicitado: ${cantidad}`);

    return stockDisponible >= cantidad;
  }
  /*-------------------reserva-------------- */

  async crearReserva(reservaDto: CreateReservaDto): Promise<Reserva> {
    const { usuarioId, productoId, cantidad } = reservaDto;
    const isAvailable = await this.validarStock(productoId, cantidad);
    if (!isAvailable) {
      throw new Error('No hay suficiente stock para esta reserva');
    }

    const reserva = this.reservaRepo.create({
      usuarioId,
      productoId,
      cantidad,
      confirmada: false,
    });

    // Incrementa stock_reservado
    await this.productoRepo.update(
      { id: productoId },
      { stock_reservado: () => `stock_reservado + ${cantidad}` }
    );

    return await this.reservaRepo.save(reserva);
  }

  async getReservas() {
    return await this.reservaRepo.find();
  }

//confirmar reserva
async confirmarReserva(id: number) {
  const reserva = await this.reservaRepo.findOneBy({ id });
  if (!reserva) {
    throw new Error(`Reserva con ID ${id} no encontrada`);
  }

  if (reserva.confirmada) {
    throw new Error(`La reserva ya está confirmada`);
  }

  // reducir stock real
  await this.productoRepo.update(
    { id: reserva.productoId },
    { stock: () => `stock - ${reserva.cantidad}` }
  );

  // marcar como confirmada
  reserva.confirmada = true;
  return await this.reservaRepo.save(reserva);
}

  async deleteReserva(id: number) {
    const reserva = await this.reservaRepo.findOneBy({ id });

    if (reserva) {
      const producto = await this.productoRepo.findOneBy({ id: reserva.productoId });

      if (producto) {
        const nuevoStockReservado = Math.max(0, producto.stock_reservado - reserva.cantidad);
        await this.productoRepo.update(
          { id: reserva.productoId },
          { stock_reservado: nuevoStockReservado }
        );
      }

      await this.reservaRepo.delete({ id });
      return { message: 'Reserva eliminada y stock liberado' };
    }

    return { message: 'Reserva no encontrada' };
  }

  // finaliza compra: reduce stock real y stock_reservado
  async finalizarCompra(items: { productoId: number; cantidad: number }[]) {
    for (const item of items) {
      const producto = await this.productoRepo.findOneBy({ id: item.productoId });
      if (!producto) {
        throw new Error(`Producto con ID ${item.productoId} no encontrado`);
      }

      if (producto.stock < item.cantidad || producto.stock_reservado < item.cantidad) {
        throw new Error(`Stock insuficiente para producto ${item.productoId}`);
      }

      // Reducir stock real y reservado
      await this.productoRepo.update(
        { id: item.productoId },
        {
          stock: () => `stock - ${item.cantidad}`,
          stock_reservado: () => `stock_reservado - ${item.cantidad}`,
        },
      );
    }
  }

  // Método para eliminar reservas caducadas
  async eliminarReservasCaducadas(): Promise<void> {
    const tiempoCaducidad = 60000; // 1 minuto (para pruebas)
    const fechaLimite = new Date(Date.now() - tiempoCaducidad);

    const reservasCaducadas = await this.reservaRepo.createQueryBuilder('reserva')
      .where('reserva.fechaReserva < :fechaLimite', { fechaLimite })
      .getMany();

    if (reservasCaducadas.length === 0) {
      return;
    }

    for (const reserva of reservasCaducadas) {
      await this.productoRepo.update(
        { id: reserva.productoId },
        { stock_reservado: () => `stock_reservado - ${reserva.cantidad}` }
      );
    }

    await this.reservaRepo.delete(reservasCaducadas.map(r => r.id));
  }
}