import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import {ENTITIES} from "../entities";
import {REPOSITORIES} from "../repositories";
import {User} from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
