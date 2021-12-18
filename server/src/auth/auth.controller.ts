import {
  Controller,
  Post,
  Response,
  Request,
  UseGuards,
  Get,
  Header,
} from '@nestjs/common';

import { LoginAuthGuard } from './guards/login-auth.guard';
import { CookieAuthGuard } from './guards/cookie-auth.guard';
import { AuthService } from './auth.service';
import { COOKIE_KEY } from './constants';

import type { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  // TODO redundant?
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Credentials', 'true')
  @UseGuards(LoginAuthGuard)
  async login(
    @Request() request,
    @Response({ passthrough: true }) response,
  ): Promise<void> {
    const { user } = request;
    // const jwt = await this.authService.createJwt(user);
    response.cookie(
      COOKIE_KEY,
      'test',
      {
        domain: 'localhost',
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        // httpOnly: false,
        httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development',
        // isSecure: process.env.NODE_ENV !== 'development',
        secure: true,
        // isSecure: true,
        // clearInvalid: true,
        path: '/',
        sameSite: 'None',
        sameParty: true,
      },
    ).send({ user });
  }

  @Post('session')
  @UseGuards(CookieAuthGuard)
  async session(@Request() request): Promise<{ user: Omit<User, 'password'>}> {
    const { user } = request;
    return { user };
  }

  @Get('logout')
  logout(@Response() response): void {
    response.status(200).clearCookie(COOKIE_KEY).send();
  }
}
