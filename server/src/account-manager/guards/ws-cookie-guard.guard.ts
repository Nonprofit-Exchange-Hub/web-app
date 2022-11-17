import { ExecutionContext, Injectable } from '@nestjs/common';
import { jwtConstants } from '../../account-manager/constants';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { WSCookieStrategy } from '../../account-manager/strategies/ws-cookie..strategy';
import * as c from 'cookie-parser';
import { User } from '../entities/user.entity';

@Injectable()
export class WsCookieGuardGuard extends AuthGuard() {
  constructor(private jwtService: JwtService) {
    super({ defaultStrategy: WSCookieStrategy });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const cookies: string[] = client.handshake.headers.cookie.split('; ');

    if (!cookies.some((cookie) => cookie.startsWith('NEH_is_cool'))) {
      return false;
    }

    const authToken = cookies.find((cookie) => cookie.startsWith('NEH_is_cool')).split('=')[1];

    if (!authToken || authToken.length === 0) {
      return false;
    }

    // Obscure non-documented work-around:
    // https://github.com/expressjs/cookie-parser/issues/48#issuecomment-702510136
    const decodedSignedCookie = decodeURIComponent(authToken);
    const jwtPayload = c.signedCookie(decodedSignedCookie, 'secret_placeholder') as string;

    let user: User;
    try {
      user = await this.jwtService.verify(jwtPayload, {
        secret: jwtConstants.secret,
      });
    } catch (error) {
      return false;
    }

    context.switchToHttp().getRequest().user = user;
    return Boolean(user);
  }
}
