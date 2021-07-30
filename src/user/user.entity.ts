import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar', { length: 50 })
  readonly nickname: string;

  @Column('boolean')
  readonly isOnline: boolean;

  constructor(
    id: string,
    nickname: string,
    isOnline: boolean
  ) {
    this.id = id;
    this.nickname = nickname;
    this.isOnline = isOnline;
  }
}
