import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class UserGateway {
  @SubscribeMessage('addUserToRoom')
  addUserToRoom(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'getUser';

    return { event, data };
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'sendMessage';

    return { event, data };
  }
}
