import { Room } from '../../room/room.entity';
import { Message } from '../../message/message.entity';

export class UserDto {
  readonly nickname: string;

  readonly isOnline: boolean;

  readonly ownRooms: Promise<Room[]> | Room[];

  readonly rooms: Promise<Room[]> | Room[];

  readonly messages: Promise<Message[]> | Message[];

  constructor(
    nickname: string,
    isOnline: boolean,
    ownRooms: Promise<Room[]> | Room[],
    rooms: Promise<Room[]> | Room[],
    messages: Promise<Message[]> | Message[],
  ) {
    this.nickname = nickname;
    this.isOnline = isOnline;
    this.ownRooms = ownRooms;
    this.rooms = rooms;
    this.messages = messages;
  }
}
