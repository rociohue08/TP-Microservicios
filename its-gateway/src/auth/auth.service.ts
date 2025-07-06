import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/interfaces/usuario.interface';



@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('MS_USER') private readonly userClient: ClientProxy,
  ) {}

  async validarUsuario(email: string, contraseña: string): Promise<User | null> {
    try {
      console.log('Enviando credenciales al microservicio Usuarios...');

      const user = await firstValueFrom(
        this.userClient.send('validarUsuario', { email, contraseña }),
      );

      console.log('Usuario recibido:', user);

 // Validar que el usuario tenga datos válidos
      if (!user || typeof user !== 'object' || !('id' in user)) {
        return null;
      }

      return user as User;
    } catch (error) {
      // Manejo seguro del error
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('❌ Error al validar usuario:', errorMessage);
      return null;
    }
  }

  async generarToken(user: User): Promise<{ access_token: string }> {
    const payload = {
      userId: user.id,
      email: user.email,
      rol: user.rol || 'USUARIO',
    };

    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}