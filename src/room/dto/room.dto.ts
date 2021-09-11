import { User } from '../../user/user.entity';
import { Message } from '../../message/message.entity';

export class RoomDto {
  readonly name: string;

  readonly creator: Promise<User> | User;

  readonly users: Promise<User[]> | User[];

  readonly messages: Promise<Message[]> | Message[];

  constructor(name: string, creator: User) {
    this.name = name;
    this.creator = creator;
  }
}
