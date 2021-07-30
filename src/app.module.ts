import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { getConnectionOptions } from "typeorm";
import { ENTITIES } from "./entities";
import {REPOSITORIES} from "./repositories";
import {User} from "./user/user.entity";

console.log(__dirname + '/entity/UserEntity.js');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.18.0.1',
      port: 3306,
      username: 'root',
      password: 'typeorm',
      database: 'pichat',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      cli: {
        entitiesDir: "src/**",
        migrationsDir: "src/migration"
      }
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
