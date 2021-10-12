import { IsString } from 'class-validator';

export class AddUserToRoomDto {
  @IsString()
  userId: string;

  @IsString()
  roomId: string;
}
