import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const room = await this.findByName(dto.name);

    if (undefined !== room) {
      throw new HttpException(
        'The room name already in use.',
        HttpStatus.CONFLICT,
      );
    }

    const creator = await this.userService.findByNickname(dto.creator);

    if (undefined === creator) {
      throw new HttpException('Creator can not be found', HttpStatus.NOT_FOUND);
    }

    return this.roomRepository.save(<CreateRoomArgs>{
      name: dto.name,
      creator,
    });
  }

  async findByName(name: string): Promise<Room | undefined> {
    return this.roomRepository.findOne({ name });
  }

  async getListOfRooms(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async getById(roomId: string): Promise<Room | undefined> {
    const room = this.roomRepository.findOne(roomId);

    if (undefined === room) {
      throw new HttpException('Room can not be found', HttpStatus.NOT_FOUND);
    }

    return room;
  }
}
