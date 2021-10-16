import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { LogoutUserDto } from '../auth/dto/logout-user.dto';

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

  async updateOnlineStatus(dto: LogoutUserDto): Promise<User> {
    const user = await this.getById(dto.id);

    user.isOnline = dto.isOnline;

    return this.userRepository.save(user);
  }

  async findByNickname(nickname: string): Promise<User | undefined> {
    return this.userRepository.findOne({ nickname });
  }

  async getListByRoomId(roomId: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rooms', 'room')
      .andWhere('room.id = :roomId', { roomId })
      .getMany();
  }

  async getOnlineListByRoomId(roomId: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rooms', 'room')
      .andWhere('user.isOnline = :isOnline')
      .andWhere('room.id = :roomId')
      .setParameters({
        isOnline: true,
        roomId,
      })
      .getMany();
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
