import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Request, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/users.service';
import { COOKIE_KEY } from '../constants';

import type { User } from '../../users/entities/user.entity';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  async validate(@Request() request): Promise<User> {
    const jwt = request.cookies[COOKIE_KEY];
    const decoded = await this.jwtService.decode(jwt) as User;
    const user = await this.usersService.findByEmail(decoded.email);
    return user;
  }
}
