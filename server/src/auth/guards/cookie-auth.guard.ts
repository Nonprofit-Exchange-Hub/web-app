import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

import { COOKIE_KEY, jwtConstants } from '../constants';
import { CookieStrategy } from '../strategies/cookie.strategy';
import { LoginStrategy } from '../strategies/login.strategy';

import type { User } from '../../users/entities/user.entity';

@Injectable()
export class CookieAuthGuard extends AuthGuard() {
  constructor(private jwtService: JwtService) {
    super({ defaultStrategy: CookieStrategy });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.signedCookies[COOKIE_KEY];

    if (!jwt) {
      return false;
    }

    let user: User = {} as User;
    try {
      user = await this.jwtService.verify(jwt, { secret: jwtConstants.secret });
    } catch (_e) {
      return false;
    }

    request.user = user;
    return true;
  }
}
