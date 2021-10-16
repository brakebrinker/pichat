import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';

import { LogoutUserDto } from './dto/logout-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(userDto: CreateUserDto): Promise<User> {
    if (userDto.nickname === '') {
      throw new HttpException(
        'Nickname can not be empty',
        HttpStatus.NOT_FOUND,
      );
    }

    const user = await this.userService.findByNickname(userDto.nickname);

    userDto.isOnline = true;

    if (undefined === user) {
      return this.userService.create(userDto);
    }

    user.isOnline = userDto.isOnline;

    await this.userService.updateOnlineStatus(<LogoutUserDto>{
      id: user.id,
      isOnline: user.isOnline,
    });

    return user;
  }

  async logout(logoutUserDto: LogoutUserDto): Promise<User> {
    return this.userService.updateOnlineStatus(logoutUserDto);
  }
}
