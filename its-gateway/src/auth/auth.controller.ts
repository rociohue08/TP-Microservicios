import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, contraseña }) {
    const user = await this.authService.validarUsuario(email, contraseña);

    if (!user) {
      return { error: 'Credenciales inválidas' };
    }

    return this.authService.generarToken(user);
  }
}