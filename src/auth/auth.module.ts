import { Module } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGateway } from './auth.gateway';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, AuthGateway],
})
export class AuthModule {}
