import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';
import { Room } from './room.entity';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('create')
  async create(@Body() dto: CreateRoomDto): Promise<Room> {
    return this.roomService.create(dto);
  }

  @Get('rooms')
  async getRooms(): Promise<Room[]> {
    return this.roomService.getListOfRooms();
  }

  @Get(':roomId')
  async getRoom(@Param('roomId') roomId: string): Promise<Room | undefined> {
    return this.roomService.getById(roomId);
  }
}
