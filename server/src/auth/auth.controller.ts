import { Controller, Post, Response, Request, Get, BadRequestException } from '@nestjs/common';

import type { Request as RequestT, Response as ResponseT } from 'express';

import { AuthService } from './auth.service';
import { COOKIE_KEY } from '../acccount-manager/constants';

import type { User } from '../users/entities/user.entity';

type AuthedRequest = RequestT & { user: User };

/**
 * @Deprecated @See AccountManagerModule
 */
@Controller('deprecated/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Request() request: AuthedRequest,
    @Response({ passthrough: true }) response: ResponseT,
  ): Promise<void> {
    const { user } = request;
    throw new BadRequestException('Deprecated resource. Use the new account manager module');
    const jwt = await this.authService.createJwt(user);
    response
      .cookie(COOKIE_KEY, jwt, {
        domain: 'localhost',
        expires: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        signed: true,
      })
      .send({ user });
  }

  @Post('session')
  async session(@Request() request: AuthedRequest): Promise<{ user: Omit<User, 'password'> }> {
    throw new BadRequestException('Deprecated resource. Use the new account manager module');
    const { user } = request;
    return { user };
  }

  @Get('logout')
  logout(@Response({ passthrough: true }) response: ResponseT): void {
    throw new BadRequestException('Deprecated resource. Use the new account manager module');
    response.clearCookie(COOKIE_KEY).send();
  }
}
