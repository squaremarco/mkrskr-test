import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'rambdax';

import { UserService } from '../user/user.service';
import { throwsException } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(username: string, password: string) {
    const user =
      (await this.userService.getOne(username)) ??
      throwsException(NotFoundException, `User ${username} not found.`);

    if (user.password !== password) {
      throwsException(UnauthorizedException, `Wrong password.`);
    }

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user._id
      })
    };
  }
}
