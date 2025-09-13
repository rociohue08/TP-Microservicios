// its-users/src/modules/usuario/usuario.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { usuarioDto } from './dtos/usuario.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

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

  async validateUser(email: string, contraseña: string): Promise<any> {
    const user = await this.prisma.usuario.findUnique({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isPasswordValid) return null;

    const { contraseña: _, ...result } = user;
    return result;
  }

  async findUserById(id: number): Promise<any> {
    const user = await this.prisma.usuario.findUnique({ where: { id } });
    if (!user) return null;

    const { contraseña: _, ...result } = user;
    return result;
  }

  async getUsuarios(): Promise<any[]> {
    const usuarios = await this.prisma.usuario.findMany();
    return usuarios.map(({ contraseña: _, ...user }) => user);
  }
}