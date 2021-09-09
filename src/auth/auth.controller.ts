import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() userDto: CreateUserDto): Promise<User> {
    return this.authService.login(userDto);
  }
}
