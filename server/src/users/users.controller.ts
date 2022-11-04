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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { Response as ResponseT } from 'express';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilesService } from '../files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizes } from '../files/file-sizes';
import { CookieAuthGuard } from '../auth/guards/cookie-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileService: FilesService,
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
      // const user = await this.usersService.findByEmail(req.body.email);
      // TODO send email the user
    } catch (e) {
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
}
