import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './prisma.service';
import { CreateUsuarioDto } from './dtos/usuario.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, contraseña: string): Promise<any> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
      return null;
    }

    const { contraseña: _, ...result } = user;
    return result;
  }

  async findUserById(id: number): Promise<any> {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    const { contraseña: _, ...result } = user;
    return result;
  }

  async registrarUsuario(dto: CreateUsuarioDto) {
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
}