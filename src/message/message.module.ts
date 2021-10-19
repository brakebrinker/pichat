import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';
import { RoomModule } from '../room/room.module';
import { UserModule } from '../user/user.module';
import { SearchModule } from '../search/search.module';

import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { MessageGateway } from './message.gateway';
import { MessageSearchService } from './message-search/message-search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    RoomModule,
    UserModule,
    SearchModule,
  ],
  exports: [TypeOrmModule],
  controllers: [MessageController],
  providers: [
    MessageService,
    RoomService,
    UserService,
    MessageGateway,
    MessageSearchService,
  ],
})
export class MessageModule {}
