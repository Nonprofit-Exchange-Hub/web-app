import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { CookieV2Strategy } from '../strategies/cookiev2.strategy';
import { COOKIE_KEY } from '../constants';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class CookieAuthV2Guard extends AuthGuard() {
  constructor(private jwtService: JwtService) {
    super({ defaultStrategy: CookieV2Strategy });
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
    } catch (_e) {
      Logger.error(_e, CookieAuthV2Guard.name);
      return false;
    }

    request.user = user;
    return true;
  }
}
