import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Reserva } from './entities/reserva.entity';
import { CreateProductoDto } from './dto/create-product.dto';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Producto) private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Reserva) private readonly reservaRepo: Repository<Reserva>

  ) {}

  async createProducto(productoDto: CreateProductoDto): Promise<Producto> {
    console.log('Creando producto:', productoDto);
    const producto = this.productoRepo.create(productoDto);
    return await this.productoRepo.save(producto);
   

  }
  // ✅ Listar productos
  async findAll() {
    return await this.productoRepo.find();
  }

  // ✅ Buscar producto por ID
  async findProductById(id: number): Promise<Producto | null> {
    return await this.productoRepo.findOneBy({ id });
  }

  // ✅ Actualizar producto
  async updateProducto(id: number, data: Partial<Producto>) {
    await this.productoRepo.update(id, data);
    return await this.productoRepo.findOneBy({ id });
  }

   // ✅ Validar stock
  async validarStock(productId: number, cantidad: number): Promise<boolean> {
    const product = await this.productoRepo.findOneBy({ id: productId });

    if (!product) return false;

    return product.stock >= cantidad;
  }
   // ✅ Crear una nueva reserva
  async crearReserva(reservaDto: CreateReservaDto): Promise<Reserva> {
    const { usuarioId, productoId, cantidad } = reservaDto;

    // Validar stock antes de crear la reserva
    const isAvailable = await this.validarStock(productoId, cantidad);

    if (!isAvailable) {
      throw new Error('No hay suficiente stock para esta reserva');
    }

    // Crear y guardar la reserva
    const reserva = this.reservaRepo.create({
      usuarioId,
      productoId,
      cantidad,
      confirmada: false,
    });

    return await this.reservaRepo.save(reserva);
  }
}