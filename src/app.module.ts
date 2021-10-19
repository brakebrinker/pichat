import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ENTITIES } from './entities';
import AppConfig from './config/app.config';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: false,
          load: [AppConfig],
        }),
      ],
      useFactory: (configService: ConfigService): any => {
        return configService.get<ConnectionOptions>('database');
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([...ENTITIES]),
    UserModule,
    AuthModule,
    RoomModule,
    MessageModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
