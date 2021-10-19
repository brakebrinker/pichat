import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';

import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { MessageSearchService } from './message-search/message-search.service';
import { MessageSearchBodyInterface } from './types/message.search-body.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly messageSearchService: MessageSearchService,
  ) {}

  async create(dto: CreateMessageDto): Promise<Message> {
    const room = await this.roomService.getById(dto.roomId);
    const creator = await this.userService.getById(dto.creatorId);

    const message = new MessageDto(dto.text, room, creator);

    const messageEntity = await this.messageRepository.save(message);

    await this.messageSearchService.indexMessage(messageEntity);

    return messageEntity;
  }

  async searchForMessages(
    text: string,
    roomId: string,
  ): Promise<Message[] | []> {
    const results = await this.messageSearchService.search(text);

    const ids = results.map(
      (result: MessageSearchBodyInterface): string => result.id,
    );

    if (!ids.length) {
      return [];
    }

    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.room', 'room')
      .leftJoinAndSelect('message.creator', 'creator')
      .whereInIds(ids)
      .andWhere('room.id=:roomId')
      .setParameters({
        roomId,
      })
      .getMany();
  }

  async getListByRoomIdForDays(
    roomId: string,
    days: string,
  ): Promise<Message[]> {
    const currentDate = new Date();
    const fromDate = new Date(currentDate);

    fromDate.setDate(currentDate.getDate() - parseInt(days, 10));

    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.room', 'room')
      .leftJoinAndSelect('message.creator', 'creator')
      .where('room.id = :roomId', { roomId })
      .andWhere(
        'message.createdAt >= :fromDate and message.createdAt <= :currentDate',
        { fromDate, currentDate },
      )
      .orderBy('message.createdAt')
      .getMany();
  }
}
