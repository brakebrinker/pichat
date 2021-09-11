import { Exclude } from 'class-transformer';

import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';

import { Room } from './room.entity';

export class RoomModel {
  readonly id: string;

  readonly name: string;

  readonly creator: Promise<User> | User;

  @Exclude()
  readonly users: Promise<User[]> | User[];

  @Exclude()
  readonly messages: Promise<Message[]> | Message[];

  constructor(partial: Partial<Room>) {
    Object.assign(this, partial);
  }
}
