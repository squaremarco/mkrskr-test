import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';

import { Public } from '../auth/public.metadata';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  getMe(@Req() request) {
    return this.userService.getMe(request);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @Public()
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() body: UpdateUserDto) {
    return this.userService.update(username, body);
  }
}
