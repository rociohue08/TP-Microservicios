//valida el token jwt
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config/envs';
import { JwtPayload } from '../interfaces/usuarioJwtPayload';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.JWT_SECRET
    });
  }

   validate(payload: JwtPayload){
    return{
      id:payload.userId,
      email: payload.email,
      rol:payload.rol,
    }

  }
    

}