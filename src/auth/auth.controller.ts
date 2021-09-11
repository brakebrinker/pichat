import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserModel } from '../user/user.model';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() userDto: CreateUserDto): Promise<UserModel> {
    const user = await this.authService.login(userDto);

    return new UserModel(user);
  }
}
