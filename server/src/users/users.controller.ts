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
} from '@nestjs/common';
import { SendgridService } from '../sendgrid/sendgrid.service';

import type { Response as ResponseT } from 'express';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly sendgridService: SendgridService,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'accept_terms'>> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Post('reset_password')
  async resetPassword(
    @Request() req,
    @Response({ passthrough: true }) response: ResponseT,
  ): Promise<void> {
    try {
      const user = await this.usersService.findByEmail(req.body.email);
      if (!user) {
        throw new Error();
      }

      const token = 'test';

      console.log('\nhere1\n');
      const mail = {
        to: user.email,
        subject: 'Givecycle Password Reset',
        from: 'jd2rogers2@gmail.com',
        html: `
          <p>Hello ${user.firstName} ${user.last_name}</p>
          <p>Please click <a href="localhost:3000/set-new-password?token=${token}">here</a> to reset your password</p>
          <p>(this link is valid for 1 hour)</p>
        `,
      };

      this.sendgridService.send(mail);
    } catch (e) {
      // always succeeds so we can always say "if there's a matching email we sent you a verify btn"
      response.status(200).send();
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
