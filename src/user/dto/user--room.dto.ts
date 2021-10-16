import { IsString } from 'class-validator';

export class UserRoomDto {
  @IsString()
  userId: string;

  @IsString()
  roomId: string;
}
