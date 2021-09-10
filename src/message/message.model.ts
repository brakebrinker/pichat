import { Exclude } from 'class-transformer';

import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';

import { Message } from './message.entity';

export class MessageModel {
  id: string;

  text: string;

  room: Promise<Room> | Room;

  creator: Promise<User> | User;

  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Message>) {
    Object.assign(this, partial);
  }
}
