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

@Entity()
@Unique(['nickname'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar', { length: 50 })
  readonly nickname: string;

  @Column('boolean', { default: true })
  readonly isOnline: boolean;

  @OneToMany(
    (): ObjectType<Room> => Room,
    (room: Room): Promise<User> | User => room.creator,
    {
      cascade: true,
    },
  )
  readonly ownRooms: Promise<Room[]> | Room[];

  @ManyToMany((): ObjectType<Room> => Room, {
    nullable: true,
  })
  @JoinTable()
  readonly rooms: Promise<Room[]> | Room[];

  constructor(id: string, nickname: string, isOnline: boolean) {
    this.id = id;
    this.nickname = nickname;
    this.isOnline = isOnline;
  }
}
