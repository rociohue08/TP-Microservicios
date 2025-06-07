/*se encarga de hacer las operaciones con la base de datos */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity'; 
import { CreateProductoDto } from './dto/create.producto.dto';

@Injectable()
export class ItsProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productRepository: Repository<Producto>,
  ) {}
//CREAR
  async create(createProductDto: CreateProductoDto): Promise<Producto> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }
//LLAMAR A TODOS LOS PRODUCTOS
  async findAll(): Promise<Producto[]> {
    return await this.productRepository.find();
  }
//LLAMAR UNN PRODUCTO POR ID 
  async findOne(id: string): Promise<Producto | null> {
    return await this.productRepository.findOneBy({ id });
  }
//ACTUALIZAR
  async update(id: string, updateProductDto: Partial<CreateProductoDto>): Promise<Producto | null> {
    await this.productRepository.update(id, updateProductDto);
 return await this.productRepository.findOneBy({ id });  }
//ELIMINAR(DESPUES VER DE SACAR PORQUE NO LO PIDE)
  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}