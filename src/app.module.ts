import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { ConnectionOptions } from "typeorm";
import { ENTITIES } from "./entities";
import { REPOSITORIES } from "./repositories";
import AppConfig from './config/app.config';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: false,
          load: [AppConfig]
        })
      ],
      useFactory: (configService: ConfigService): any => {
        return configService.get<ConnectionOptions>('database');
      },
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([...ENTITIES]),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
