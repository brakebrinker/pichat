import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room } from './room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), UserModule],
  exports: [TypeOrmModule],
  controllers: [RoomController],
  providers: [RoomService, UserService],
})
export class RoomModule {}
