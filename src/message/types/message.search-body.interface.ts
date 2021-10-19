import { Room } from '../../room/room.entity';
import { User } from '../../user/user.entity';

export interface MessageSearchBodyInterface {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  creator: User;
  room: Room;
}
