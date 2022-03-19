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
import type { Response as ResponseT } from 'express';
import { Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSansPasswordDto } from './dto/user-sans-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserSansPasswordDto> {
    const user = await this.usersService.create(createUserDto);

    // delete user.password;
    return user as UserSansPasswordDto;
  }

  @Post('reset_password')
  async resetPassword(
    @Request() req,
    @Response({ passthrough: true }) response: ResponseT,
  ): Promise<void> {
    try {
      const user = await this.usersService.findByEmail(req.body.email);
      //TODO send email the user
    } catch (e) {
      response.status(200).send();
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // just for testing user service findByEmail
  // will remove before deploy
  @Get('email')
  async findByEmail(@Query() query) {
    return this.usersService.findByEmail(query.email);
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
