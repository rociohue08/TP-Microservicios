import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config/envs';
import { payloadInterface } from 'src/interfaces/PayloadInterfece';

@Injectable()
export class JwtPassport extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.JWT_SEED,
    });
  }

  validate(payload: payloadInterface) {
    return {
      id: payload.userId,
      email: payload.email,
      rol: payload.rol,
    };
  }
}