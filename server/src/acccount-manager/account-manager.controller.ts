import {
  Controller,
  Post,
  Response,
  Request,
  UseGuards,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { Request as RequestT, Response as ResponseT } from 'express';
import { COOKIE_KEY } from './constants';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AccountManagerService } from './account-manager.service';
import { CookieAuthGuard } from './guards/cookie-auth.guard';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { UsersService } from './user.service';

type AuthedRequest = RequestT & { user: User };

/**
 * controller handles the requests required for account management
 * including CRUD'ing the user entity
 */
@Controller('auth')
export class AccountManagerController {
  constructor(
    private accountManagerService: AccountManagerService,
    private readonly sendgridService: SendgridService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'accept_terms'>> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Post('login')
  @UseGuards(LoginAuthGuard)
  async login(
    @Request() request: AuthedRequest,
    @Response({ passthrough: true }) response: ResponseT,
  ): Promise<void> {
    const { user } = request;
    const jwt = await this.accountManagerService.createJwt(user);
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
  @UseGuards(CookieAuthGuard)
  async session(@Request() request: AuthedRequest): Promise<{ user: Omit<User, 'password'> }> {
    const { user } = request;
    const { firstName, last_name, email } = await this.usersService.findOne(user.id);
    return { user: { ...user, firstName, last_name, email } };
  }

  @Get('logout')
  logout(@Response({ passthrough: true }) response: ResponseT): void {
    response.clearCookie(COOKIE_KEY).send();
  }

  @Post('reset_password')
  async resetPassword(
    @Request() req,
    @Response({ passthrough: true }) response: ResponseT,
  ): Promise<void> {
    try {
      const user = await this.usersService.findByEmail(req.body.email);
      if (!user) {
        // any error hits catch, error type and msg not important
        throw new Error();
      }

      const jwt = await this.jwtService.sign(
        { valid: true },
        { expiresIn: '1h', secret: process.env.JWT_SECRET },
      );

      const mail = {
        to: user.email,
        subject: 'Givecycle Password Reset',
        from: 'jd2rogers2@gmail.com',
        html: `
          <p>Hello ${user.firstName} ${user.last_name}</p>
          <p>Please click <a href="http://localhost:3000/set-new-password?token=${jwt}">here</a> to reset your password</p>
          <p>(this link is valid for 1 hour)</p>
        `,
      };

      await this.sendgridService.send(mail);
      response.status(200);
    } catch (e) {
      // always respond 200 so hackerz don't know which emails are active and not
      response.status(200);
    }
  }

  @Get('users/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('users/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('users/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
