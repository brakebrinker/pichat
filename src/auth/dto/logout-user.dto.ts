import { IsBoolean, IsString } from 'class-validator';

export class LogoutUserDto {
  @IsString()
  id: string;

  @IsBoolean()
  isOnline: boolean;
}
