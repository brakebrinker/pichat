import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';
import { RoomModule } from '../room/room.module';
import { UserModule } from '../user/user.module';

import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), RoomModule, UserModule],
  exports: [TypeOrmModule],
  controllers: [MessageController],
  providers: [MessageService, RoomService, UserService],
})
export class MessageModule {}
