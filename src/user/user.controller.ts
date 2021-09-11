import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserModel } from './user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  async create(@Body() dto: CreateUserDto): Promise<UserModel> {
    const user = await this.userService.create(dto);

    return new UserModel(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users/roomId/:roomId')
  async usersByRoom(@Param('roomId') roomId: string): Promise<User[]> {
    return this.userService.getListByRoomId(roomId);
  }
}
