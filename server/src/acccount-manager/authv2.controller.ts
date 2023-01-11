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
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';

import type { Request as RequestT, Response as ResponseT } from 'express';

import { LoginAuthGuard } from './guards/login-auth.guard';
import { CookieAuthGuard } from './guards/cookie-auth.guard';
import { COOKIE_KEY } from './constants';

import type { User } from './entities/user.entity';
import { AccountManagerService } from './account-manager.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizes } from '../files/file-sizes';
import { FilesService } from '../files/files.service';

type AuthedRequest = RequestT & { user: User };

@Controller('auth')
export class AuthController {
  constructor(
    private accountManagerService: AccountManagerService,
    private usersService: UsersService,
    private readonly fileService: FilesService,
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
    const { firstName, last_name, email, profile_image_url } = await this.usersService.findOne(
      user.id,
    );
    return { user: { ...user, firstName, last_name, email, profile_image_url } };
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
      // const user = await this.usersService.findByEmail(req.body.email);
      // TODO send email the user
    } catch (e) {
      response.status(200).send();
    }
  }

  @Put('profile/:id')
  @UseGuards(CookieAuthGuard)
  @UseInterceptors(FileInterceptor('profile_image_url', { limits: { fileSize: FileSizes.MB } }))
  async upsertProfile(
    @Param('id') id: number,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (/\.(jpe?g|png|gif)$/i.test(file.filename)) {
      return new BadRequestException(
        'Only valid image extensions allowed (.jpg, .jpeg, .png, .gif)',
      );
    }
    return this.saveFile(id, file);
  }

  private async saveFile(id: number, file: Express.Multer.File) {
    const dbUser = await this.usersService.findOne(id);

    if (!dbUser) {
      return new BadRequestException('User not found');
    }

    const fileUrl = await this.fileService.uploadFile(file, id, 'userprofile', 'replace');
    return await this.usersService.update(id, { ...dbUser, profile_image_url: fileUrl });
  }

  @Get('users/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('users/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('uses/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
