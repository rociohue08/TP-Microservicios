import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  async getUserById(id: number): Promise<any> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  async validateUser(email: string, contraseña: string): Promise<any> {
    // Aquí validas las credenciales (por ejemplo, comparando contraseñas hash)
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

  
    if (contraseña === 'contraseña_dummy') {
      return user;
    }

    return null;
  }
}