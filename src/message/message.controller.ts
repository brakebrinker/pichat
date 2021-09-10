import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
import { MessageModel } from './message.model';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  async create(@Body() dto: CreateMessageDto): Promise<MessageModel> {
    const message = await this.messageService.create(dto);

    return new MessageModel(message);
  }
}
