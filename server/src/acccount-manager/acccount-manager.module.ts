import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AccountManagerService } from './account-manager.service';
import { UsersV2Service } from './userv2.service';

const providers = [
  AccountManagerService,
  UsersV2Service,
  LoginStrategy,
  CookieStrategy,
  WSCookieStrategy,
  JwtService,
];

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [...providers],
  exports: providers,
})
export class AcccountManagerModule {}
