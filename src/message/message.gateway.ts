import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Server } from 'socket.io';

import { MessageModel } from './message.model';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({ cors: true })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messageService: MessageService) {}

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() dto: CreateMessageDto,
  ): Promise<MessageModel> {
    const message = new MessageModel(await this.messageService.create(dto));

    this.server.emit('sendMessageToClient', message);

    return new MessageModel(message);
  }
}
