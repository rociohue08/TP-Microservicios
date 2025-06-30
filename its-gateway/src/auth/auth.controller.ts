import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { usuariosClient } from 'src/clients/usuarios.client';
import { firstValueFrom } from 'rxjs';
import { JwtPayload } from 'src/interfaces/usuarioJwtPayload';
import { User } from 'src/interfaces/usuario.interface';

@Controller('auth')
export class AuthController {
  constructor(private jwt: JwtService) {}

  @Post('login')
  async login(@Body() { email, contraseña }) {
    const client = usuariosClient();

    try { /*user:User (interfaz. el objeto debe ser definido sino se toma como any 
      en tonces el usar la interfaz le digo: este objeto que recibo
      del microservicio tiene una estructura exacta) */
      const user: User = await firstValueFrom(
        client.send('validateUser', { email, contraseña })
      );
      if (!user) {
        return { error: 'Credenciales inválidas' };
      }

      //usamos la interfaz JwtPayload para tipar bie el payload
      const payload: JwtPayload = {
        userId: user.id,
        email: user.email,
        rol: user.rol || 'USUARIO',
      };

    const token = this.jwt.sign(payload);
      return { token };
    } catch{
      return { error: 'Error al iniciar sesión' };
    } finally {
      await client.close();
    }
  }
}