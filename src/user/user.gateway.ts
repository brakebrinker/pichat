import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class UserGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('addUserToRoom')
  addUserToRoom(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'addUserToRoom';

    this.server.emit('userEnterToRoom', data);

    return { event, data };
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'sendMessage';

    this.server.emit('sendMessageToClient', data);

    return { event, data };
  }
}
