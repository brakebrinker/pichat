import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '../user/user.service';

import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';
import { RoomDto } from './dto/room.dto';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';

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

    return this.roomRepository.save(new RoomDto(dto.name, creator));
  }

  async addUserToRoom(dto: AddUserToRoomDto): Promise<void> {
    const user = await this.userService.getById(dto.userId);
    const room = await this.getById(dto.roomId);

    await room.addUserToRoom(user);

    await this.roomRepository.save(room);
  }

  async findByName(name: string): Promise<Room | undefined> {
    return this.roomRepository.findOne({ name });
  }

  async getListOfRooms(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async getById(id: string): Promise<Room> {
    return this.roomRepository.findOneOrFail(id);
  }
}
