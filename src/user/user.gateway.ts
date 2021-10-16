import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Server } from 'socket.io';
import { forwardRef, Inject } from '@nestjs/common';

import { RoomService } from '../room/room.service';

import { UserRoomDto } from './dto/user--room.dto';
import { UserModel } from './user.model';

@WebSocketGateway({ cors: true })
export class UserGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef((): any => RoomService))
    private roomService: RoomService,
  ) {}

  @SubscribeMessage('addUserToRoom')
  async addUserToRoom(@MessageBody() dto: UserRoomDto): Promise<void> {
    const user = await this.roomService.addUserToRoom(dto);

    this.server.emit('userEnterToRoom', new UserModel(user));
  }

  @SubscribeMessage('userExitRoom')
  async userExitRoom(@MessageBody() dto: UserRoomDto): Promise<void> {
    const user = await this.roomService.removeUserFromRoom(dto);

    this.server.emit('userLeftRoom', new UserModel(user));
  }
}
