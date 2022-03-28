import { Controller, Post, Response, Request, UseGuards, Get } from '@nestjs/common';

import type { Response as ResponseT } from 'express';

import { LoginAuthGuard } from './guards/login-auth.guard';
import { CookieAuthGuard } from './guards/cookie-auth.guard';
import { AuthService } from './auth.service';
import { COOKIE_KEY } from './constants';

import type { User } from '../users/entities/user.entity';
import type { AuthedRequest } from '../types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LoginAuthGuard)
  async login(
    @Request() request: AuthedRequest,
    @Response({ passthrough: true }) response: ResponseT,
  ): Promise<void> {
    const { user } = request;
    const jwt = await this.authService.createJwt(user);
    response
      .cookie(COOKIE_KEY, jwt, {
        domain: 'localhost',
        expires: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: true,
        signed: true,
      })
      .send({ user });
  }

  @Post('session')
  @UseGuards(CookieAuthGuard)
  async session(@Request() request: AuthedRequest): Promise<{ user: Omit<User, 'password'> }> {
    const { user } = request;
    return { user };
  }

  @Get('logout')
  logout(@Response({ passthrough: true }) response: ResponseT): void {
    response.clearCookie(COOKIE_KEY).send();
  }
}
