import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { UserMetadata } from '../../common/dto/request.dto';
import { jwtConstants } from '../constants';
import cookieExtractJwt from '../cookie.extract-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractJwt,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: UserMetadata) {
    return payload;
  }
}
