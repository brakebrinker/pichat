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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
