import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.findByNickname(userDto.nickname);

    if (user === undefined) {
      return this.userService.create(userDto);
    }

    return user;
  }
}
