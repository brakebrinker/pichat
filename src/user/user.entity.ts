import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['nickname'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar', { length: 50 })
  readonly nickname: string;

  @Column('boolean', { default: true })
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
