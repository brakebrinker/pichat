import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { UserRoomDto } from '../user/dto/user--room.dto';

import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { RoomModel } from './room.model';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  async create(@Body() dto: CreateRoomDto): Promise<RoomModel> {
    const room = await this.roomService.create(dto);

    return new RoomModel(room);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('rooms')
  async getRooms(): Promise<RoomModel[]> {
    const rooms = await this.roomService.getListOfRooms();

    return rooms.map((room: Room): RoomModel => new RoomModel(room));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('user')
  async addUserToRoom(@Body() dto: UserRoomDto): Promise<void> {
    await this.roomService.addUserToRoom(dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('id/:roomId')
  async getRoom(@Param('roomId') roomId: string): Promise<RoomModel> {
    const room = await this.roomService.getById(roomId);

    return new RoomModel(room);
  }
}
