import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersModule } from '../users.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
