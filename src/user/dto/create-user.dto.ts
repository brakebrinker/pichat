import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nickname: string;

  @IsBoolean()
  isOnline: boolean;
}
