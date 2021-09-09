import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';

type CreateRoomArgs = {
  name: string;
  creator: Promise<User> | User;
};

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private userService: UserService,
  ) {}

  async create(dto: CreateRoomDto): Promise<Room> {
    const creator = await this.userService.findByNickname(dto.creator);

    if (creator === undefined) {
      throw new Error('Creator can not be found');
    }

    return this.roomRepository.save(<CreateRoomArgs>{
      name: dto.name,
      creator,
    });
  }

  async getListOfRooms(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async getByUserId(userId: string): Promise<Room> {
    return this.roomRepository.findOneOrFail({
      where: { creatorId: userId },
    });
  }
}
