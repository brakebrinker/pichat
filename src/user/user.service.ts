import { Injectable } from '@nestjs/common';
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.userRepository.save(dto);
  }

  async findByNickname(nickname: string) {
    return this.userRepository.findOne({ nickname });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
