import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// eslint-disable-next-line import/no-cycle
import { RoomModule } from '../room/room.module';
import { RoomService } from '../room/room.service';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserGateway } from './user.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef((): any => RoomModule),
  ],
  providers: [UserService, RoomService, UserGateway],
  exports: [TypeOrmModule],
  controllers: [UserController],
})
export class UserModule {}
