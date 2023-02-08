import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { User } from './entities/user.entity';
import { AccountManagerService } from './account-manager.service';
import { AccountManagerController } from './account-manager.controller';
import { CookieV2Strategy } from './strategies/cookiev2.strategy';
import { LoginV2Strategy } from './strategies/loginv2.strategy';
import { WSCookieV2Strategy } from './strategies/ws-cookiev2.strategy';
import { UsersV2Service } from './userv2.service';

const providers = [
  AccountManagerService,
  UsersV2Service,
  LoginV2Strategy,
  CookieV2Strategy,
  WSCookieV2Strategy,
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
  controllers: [AccountManagerController],
  providers: [...providers, SendgridService],
  exports: providers,
})
export class AcccountManagerModule {}
