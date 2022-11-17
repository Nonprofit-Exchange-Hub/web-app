import { Module } from '@nestjs/common';
import { AccountManagerService } from './account-manager.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { CookieStrategy } from './strategies/cookie.strategy';
import { WSCookieStrategy } from './strategies/ws-cookie..strategy';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthController } from './auth.controller';
import { FilesService } from '../files/files.service';
import { LoginStrategy } from './strategies/login.strategy';

const providers = [
  AccountManagerService,
  UsersService,
  LoginStrategy,
  CookieStrategy,
  WSCookieStrategy,
  JwtService,
];
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [...providers, FilesService],
  exports: providers,
})
export class AccountManagerModule {}
