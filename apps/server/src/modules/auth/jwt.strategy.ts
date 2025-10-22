import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // we would change this in prod to ensure tokens expire
      secretOrKey: process.env.JWT_SECRET || 'local-dominator-secret-key',
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
