import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @ApiTags('Auth')
  @Post('login')

@ApiOperation({ summary: 'Iniciar sesión y obtener un token JWT' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario@test.com' },
        contraseña: { type: 'string', example: '123456' },
      },
      required: ['email', 'contraseña'],
    },
  })
  @ApiResponse({ status: 200, description: 'Login exitoso. Devuelve un JWT' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })


  async login(@Body() { email, contraseña }) {
    const user = await this.authService.validarUsuario(email, contraseña);
    if (!user) {
       console.log ('Algo salió mal con las credenciales proporcionadas')
      return { error: 'Credenciales inválidas' };
     
    }
    return this.authService.generarToken(user);

    
  }
  
}
