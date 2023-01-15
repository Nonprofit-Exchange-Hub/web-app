import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

import { COOKIE_KEY } from '../../acccount-manager/constants';

import type { User } from '../../users/entities/user.entity';
import { CookieStrategy } from '../strategies/cookie.strategy';

/**
 * @Deprecated see Account module for the current version
 */
@Injectable()
export class CookieAuthGuard extends AuthGuard() {
  constructor(private jwtService: JwtService) {
    super({ defaultStrategy: CookieStrategy });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    throw new Error('Deprecated AuthGuard. Use the new account manager module');
    const request = context.switchToHttp().getRequest();
    const jwt = request.signedCookies[COOKIE_KEY];

    if (!jwt) {
      return false;
    }

    let user: User = {} as User;
    try {
      user = await this.jwtService.verify(jwt, { secret: process.env.JWT_SECRET });
    } catch (_e) {
      return false;
    }

    request.user = user;
    return true;
  }
}
