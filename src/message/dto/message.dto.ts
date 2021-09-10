import { Room } from '../../room/room.entity';
import { User } from '../../user/user.entity';

export class MessageDto {
  readonly text: string;

  readonly room: Promise<Room> | Room;

  readonly creator: Promise<User> | User;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  constructor(
    text: string,
    room: Promise<Room> | Room,
    creator: Promise<User> | User,
    createdAt: Date = new Date(),
  ) {
    this.text = text;
    this.room = room;
    this.creator = creator;
    this.createdAt = createdAt;
    this.updatedAt = new Date(createdAt);
  }
}
