import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
import { MessageModel } from './message.model';
import { Message } from './message.entity';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  async create(@Body() dto: CreateMessageDto): Promise<MessageModel> {
    const message = await this.messageService.create(dto);

    return new MessageModel(message);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('messages/roomId/:roomId/:days')
  async messagesByRoom(
    @Param('roomId') roomId: string,
    @Param('days') days: string,
  ): Promise<MessageModel[]> {
    const messages = await this.messageService.getListByRoomIdForDays(
      roomId,
      days,
    );

    return messages.map(
      (message: Message): MessageModel => new MessageModel(message),
    );
  }
}
