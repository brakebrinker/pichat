import {
  Column,
  Entity,
  ManyToOne,
  ObjectType,
  PrimaryGeneratedColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { User } from '../user/user.entity';
// eslint-disable-next-line import/no-cycle
import { Room } from '../room/room.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('text')
  readonly text: string;

  @ManyToOne(
    (): ObjectType<User> => User,
    (user: User): Promise<Message[]> | Message[] => user.messages,
  )
  readonly creator: Promise<User> | User;

  @ManyToOne(
    (): ObjectType<Room> => Room,
    (room: Room): Promise<Message[]> | Message[] => room.messages,
  )
  readonly room: Promise<Room> | Room;

  @Column({ precision: 6 })
  readonly createdAt: Date;

  @Column({ precision: 6 })
  readonly updatedAt: Date;

  constructor(
    id: string,
    text: string,
    room: Promise<Room> | Room,
    creator: Promise<User> | User,
    createdAt: Date = new Date(),
  ) {
    this.id = id;
    this.text = text;
    this.creator = creator;
    this.room = room;
    this.createdAt = createdAt;
    this.updatedAt = new Date(createdAt);
  }
}
