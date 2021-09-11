import { Exclude } from 'class-transformer';

import { Room } from '../room/room.entity';
import { Message } from '../message/message.entity';

import { User } from './user.entity';

export class UserModel {
  readonly id: string;

  readonly nickname: string;

  readonly isOnline: boolean;

  @Exclude()
  readonly ownRooms: Promise<Room[]> | Room[];

  @Exclude()
  readonly rooms: Promise<Room[]> | Room[];

  @Exclude()
  readonly messages: Promise<Message[]> | Message[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
