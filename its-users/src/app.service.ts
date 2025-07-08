//Este es el corazón del microservicio Usuarios.


import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './prisma.service';
import { usuarioDto } from './dtos/usuario.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  // Valida credenciales cuando se hace login
  async validateUser(email: string, contraseña: string): Promise<any> {
    const user = await this.prisma.usuario.findUnique({ where: { email } });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isPasswordValid) return null;

    const { contraseña: _, ...result } = user;
    return result;
  }

  // Busca un usuario por ID (para validar el token)
  async findUserById(id: number): Promise<any> {
    const user = await this.prisma.usuario.findUnique({ where: { id } });
    if (!user) return null;

    const { contraseña: _, ...result } = user;
    return result;
  }
   async registrarUsuario(dto: usuarioDto) {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (usuarioExistente) {
      throw new Error('El correo ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(dto.contraseña, 10);

    const nuevoUsuario = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        email: dto.email,
        contraseña: hashedPassword,
        rol: dto.rol || 'USUARIO',
      },
    });

    const { contraseña: _, ...result } = nuevoUsuario;
    return result;
  }

// Agrega un producto al carrito
  async agregarAlCarrito(usuarioId: number, productoId: number, cantidad: number) {
    try {
      const carrito = await this.prisma.carrito.findUnique({
        where: {
          usuarioId_productoId: {
            usuarioId,
            productoId,
          },
        },
      });

      if (carrito) {
        return await this.prisma.carrito.update({
          where: {
            usuarioId_productoId: {
              usuarioId,
              productoId,
            },
          },
          data: {
            cantidad: carrito.cantidad + cantidad,
          },
        });
      }

      return await this.prisma.carrito.create({
        data: {
          usuarioId,
          productoId,
          cantidad,
        },
      });
    } catch (error) {
      console.error('❌ Error agregando al carrito:', error.message || 'Error desconocido');
      throw new Error('No se pudo agregar al carrito');
    }
  }
}
