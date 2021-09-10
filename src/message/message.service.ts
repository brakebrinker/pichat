import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';

import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateMessageDto): Promise<Message> {
    const room = await this.roomService.getById(dto.roomId);
    const creator = await this.userService.getById(dto.creatorId);

    const message = new MessageDto(dto.text, room, creator);

    return this.messageRepository.save(message);
  }
}
