import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  ObjectType,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { User } from '../user/user.entity';
// eslint-disable-next-line import/no-cycle
import { Message } from '../message/message.entity';

@Entity()
@Unique(['name'])
export class Room {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar', { length: 50 })
  readonly name: string;

  @ManyToOne(
    (): ObjectType<User> => User,
    (user: User): Promise<Room[]> | Room[] => user.ownRooms,
  )
  readonly creator: Promise<User> | User;

  @ManyToMany(
    (): ObjectType<User> => User,
    (user: User): Promise<Room[]> | Room[] => user.rooms,
  )
  readonly users: Promise<User[]> | User[];

  @OneToMany(
    (): ObjectType<Message> => Message,
    (message: Message): Promise<Room> | Room => message.room,
  )
  readonly messages: Promise<Message[]> | Message[];

  constructor(id: string, name: string, creator: User) {
    this.id = id;
    this.name = name;
    this.creator = creator;
  }
}
