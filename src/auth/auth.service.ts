import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.findByNickname(userDto.nickname);

    userDto.isOnline = true;

    if (undefined === user) {
      return this.userService.create(userDto);
    }

    return user;
  }
}
