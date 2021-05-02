import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
