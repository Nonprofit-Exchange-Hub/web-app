import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Response,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import type { Response as ResponseT } from 'express';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SendgridService } from '../sendgrid/sendgrid.service';

/**
 * @Deprecated @See AccountManagerModule
 */
@Controller('deprecated/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly sendgridService: SendgridService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'accept_terms'>> {
    throw new BadRequestException('Deprecated resource. Use the new account manager module');
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Post('reset_password')
  async resetPassword(
    @Request() req,
    @Response({ passthrough: true }) response: ResponseT,
  ): Promise<void> {
    throw new BadRequestException('Deprecated resource. Use the new account manager module');
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

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    throw new BadRequestException('Deprecated resource. Use the new account manager module');
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    throw new BadRequestException('Deprecated resource. Use the new account manager module');
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    throw new BadRequestException('Deprecated resource. Use the new account manager module');
    return this.usersService.remove(id);
  }
}
