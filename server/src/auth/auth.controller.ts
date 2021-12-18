import { Controller, Post, Response, Request, UseGuards, Get, Next, Header } from '@nestjs/common';

import { LoginAuthGuard } from './guards/login-auth.guard';
import { CookieAuthGuard } from './guards/cookie-auth.guard';
import { AuthService } from './auth.service';
import { COOKIE_KEY } from './constants';

import type { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  // @Header('Access-Control-Allow-Origin', '*')
  // @Header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  @UseGuards(LoginAuthGuard)
  async login(
    @Request() request,
    @Response({ passthrough: true }) response,
    // @Next() next,
  // ): Promise<{ user: Omit<User, 'password'> }> {
  ): Promise<void> {
    const jwt = await this.authService.createJwt({ ...request.user });
    response.cookie(
      COOKIE_KEY,
      jwt,
      {
        domain: 'localhost',
        // httpOnly: false,
        // httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development',
        // isSecure: process.env.NODE_ENV !== 'development',
        // secure: true,
        // isSecure: true,
        // clearInvalid: true,
        path: '/login',
        sameSite: 'none',
      },
    ).send({ user: request.user });
    // console.log('\n\n');
    // console.log(response);
    // console.log('\n\n');
    // next();
    // response.send();
  }

  @Get('logout')
  logout(@Response() response): void {
    response.status(200).clearCookie(COOKIE_KEY).send();
  }
}
