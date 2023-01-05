import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

import { COOKIE_KEY } from '../constants';
import { CookieStrategy } from '../strategies/cookie.strategy';
import { UserOrganizationsService } from '../../user-org/user-org.service';

import type { User } from '../../users/entities/user.entity';

@Injectable()
export class IsOrgAuthGuard extends AuthGuard() {
  constructor(private jwtService: JwtService, private userOrgService: UserOrganizationsService) {
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
      user = await this.jwtService.verify(jwt, { secret: process.env.JWT_SECRET });
      const userOrgs = this.userOrgService.getAllByUserId(user.id);

      // check that the user has an org to post on behalf of
      // check that there is only 1 org (temp)
      // temp - only allow posts from users that only have 1 org
      //      - created relationship as many to many for future fleixbility
      //           but only want a 1to1 user<>org relationship for now
      if (userOrgs.length !== 1) {
        return false;
      }

      request.user = user;

      return true;
    } catch (_e) {
      return false;
    }
  }
}
