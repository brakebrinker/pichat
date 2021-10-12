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
  async usersOnlineByRoom(
    @Param('roomId') roomId: string,
  ): Promise<UserModel[]> {
    const users = await this.userService.getOnlineListByRoomId(roomId);

    return Promise.all(
      users.map(async (user: User): Promise<UserModel> => new UserModel(user)),
    );
  }
}
