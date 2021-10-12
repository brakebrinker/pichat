import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  ObjectType,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { Room } from '../room/room.entity';
// eslint-disable-next-line import/no-cycle
import { Message } from '../message/message.entity';

@Entity()
@Unique(['nickname'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar', { length: 50 })
  readonly nickname: string;

  @Column('boolean')
  readonly isOnline: boolean;

  @OneToMany(
    (): ObjectType<Room> => Room,
    (room: Room): Promise<User> | User => room.creator,
    {
      cascade: true,
    },
  )
  readonly ownRooms: Promise<Room[]> | Room[];

  @ManyToMany(
    (): ObjectType<Room> => Room,
    (room: Room): Promise<User[]> | User[] => room.users,
  )
  @JoinTable()
  rooms: Promise<Room[]> | Room[];

  @OneToMany(
    (): ObjectType<Message> => Message,
    (message: Message): Promise<User> | User => message.creator,
    { cascade: true },
  )
  readonly messages: Promise<Message[]> | Message[];

  constructor(id: string, nickname: string, isOnline: boolean) {
    this.id = id;
    this.nickname = nickname;
    this.isOnline = isOnline;
  }

  getRooms(): Promise<Room[]> | Room[] {
    return this.rooms;
  }
}
