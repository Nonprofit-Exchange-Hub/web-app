import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LoginStrategy } from './strategies/login.strategy';
import { CookieStrategy } from './strategies/cookie.strategy';
import { jwtConstants } from './constants';
import { WSCookieStrategy } from './strategies/ws-cookie..strategy';

@Module({
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      // TODO make this an env var
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LoginStrategy, CookieStrategy, WSCookieStrategy],
})
export class AuthModule {}
