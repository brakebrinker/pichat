import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.findByNickname(dto.nickname);

    if (undefined !== user) {
      throw new HttpException(
        'This nickname already in use.',
        HttpStatus.CONFLICT,
      );
    }

    return this.userRepository.save(dto);
  }

  async findByNickname(nickname: string): Promise<User | undefined> {
    return this.userRepository.findOne({ nickname });
  }

  async getListByRoomId(roomId: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rooms', 'room')
      .where('room.id = :roomId', { roomId })
      .getMany();
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
