import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth/auth.service';
import { ACCESS_TOKEN } from './auth/constants';
import { Public } from './auth/public.metadata';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('auth/login')
  async login(@Body() body, @Res() response: Response) {
    const { username, password } = body;

    const { access_token } = await this.authService.login(username, password);

    response
      .cookie(ACCESS_TOKEN, access_token, {
        httpOnly: true
      })
      .send({ success: true });
  }
}
