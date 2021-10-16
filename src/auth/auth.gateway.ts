import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Server } from 'socket.io';

import { LogoutUserDto } from './dto/logout-user.dto';
import { AuthService } from './auth.service';

@WebSocketGateway()
export class AuthGateway {
  @WebSocketServer()
  server: Server;

  constructor(private authService: AuthService) {}

  @SubscribeMessage('logout')
  async logout(@MessageBody() dto: LogoutUserDto): Promise<void> {
    const user = await this.authService.logout(dto);

    this.server.emit('userLogout', user);
  }
}
