import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(userDto: CreateUserDto) {
    const user = await this.userService.findByNickname(userDto.nickname);

    if (user === undefined) {
      return await this.userService.create(userDto);
    }

    return user;
  }
}
