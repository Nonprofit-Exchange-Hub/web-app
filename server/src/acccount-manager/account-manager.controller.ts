import {
  Controller,
  Post,
  Response,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
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
  InternalServerErrorException,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizes } from '../file-storage/domain';
import { FilesStorageService } from '../file-storage/file-storage.service';
import {
  LoginDto,
  ResetPasswordDto,
  VerifyEmailDto,
  ReturnSessionDto,
  ReturnUserDto,
} from './dto/auth.dto';
import { ApiBody, ApiConsumes, ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';

type AuthedRequest = RequestT & { user: User };

/**
 * controller handles the requests required for account management
 * including CRUD'ing the user entity
 */
@ApiTags('auth')
@Controller('auth')
export class AccountManagerController {
  constructor(
    private accountManagerService: AccountManagerService,
    private sendgridService: SendgridService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private fileStorageService: FilesStorageService,
  ) {}

  @Patch('verify-email')
  async verifyEmail(@Body() body: VerifyEmailDto): Promise<boolean> {
    try {
      const user = await this.jwtService.verify(body.token, { secret: process.env.JWT_SECRET });
      this.usersService.update(user.id, { ...user, email_verified: true });
      return true;
    } catch {
      throw Error('jwt verify fail');
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    if (createUserDto.interests) {
      const res = await this.accountManagerService.validateInterests(createUserDto.interests.names);
      if (!res) {
        throw new BadRequestException('Invalid Categories');
      }
    }
    const user = await this.usersService.create(createUserDto);

    const jwt = await this.jwtService.sign(
      { ...user },
      {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      },
    );
    const mail = {
      to: user.email,
      subject: 'Givingful Email Verification',
      from: 'admin@nonprofitcircle.org',
      html: `
        <p>Hello ${user.firstName} ${user.last_name}</p>
        <p>Please click <a href="${process.env.FE_DOMAIN}/email-verification?token=${jwt}">here</a> to verify your email.</p>
        <p>(this link is valid for 1 hour)</p>
        <p>Thank you!!</p>
        <p>The Givingful Team</p>
      `,
      mailSettings: { sandboxMode: { enable: process.env.NODE_ENV !== 'production' } },
    };
    await this.sendgridService.send(mail);

    return user;
  }

  @ApiBody({ type: LoginDto })
  @Post('login')
  @UseGuards(LoginAuthGuard)
  async login(
    @Request() request: AuthedRequest,
    @Response({ passthrough: true }) response: ResponseT,
  ): Promise<void> {
    const { user } = request;
    // if (!user.email_verified) {
    //   throw new HttpException(
    //     { status: HttpStatus.UNAUTHORIZED, message: 'Unauthorized' },
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }

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
  async session(@Request() request: AuthedRequest): Promise<ReturnSessionDto> {
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

  @ApiBody({ type: ResetPasswordDto })
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
        subject: 'Givingful Password Reset',
        from: 'admin@nonprofitcircle.org',
        html: `
          <p>Hello ${user.firstName} ${user.last_name}</p>
          <p>Please click <a href="${process.env.FE_DOMAIN}/set-new-password?token=${jwt}">here</a> to reset your password</p>
          <p>(this link is valid for 1 hour)</p>
          <p>Thank you!!</p>
          <p>The Givingful Team</p>
        `,
      };

      await this.sendgridService.send(mail);
      response.status(200);
    } catch (e) {
      // always respond 200 so hackerz don't know which emails are active and not
      response.status(200);
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        profile_image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Put('users/profile/:id')
  @UseGuards(CookieAuthGuard)
  @UseInterceptors(
    FileInterceptor('profile_image', {
      limits: { fileSize: FileSizes.MB },
    }),
  )
  @ApiResponse({ status: 200, type: ReturnUserDto })
  async upsertProfile(
    @Param('id') id: number,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<ReturnUserDto | BadRequestException> {
    if (/\.(jpe?g|png|gif)$/i.test(file.filename)) {
      return new BadRequestException(
        'Only valid image extensions allowed (.jpg, .jpeg, .png, .gif)',
      );
    }
    return this.saveFile(id, file);
  }

  private async saveFile(id: number, file: Express.Multer.File) {
    let dbUser: Omit<User, 'password'>;
    try {
      dbUser = await this.usersService.findOne(id);
    } catch {
      throw new InternalServerErrorException('There was an unexpected error with your request');
    }

    if (!dbUser) {
      return new BadRequestException('User not found');
    }

    const fileUrl = await this.fileStorageService.storeImage({
      file,
      userId: id,
      prefix: 'userprofile',
      replaceFlag: 'replace',
    });
    return await this.usersService.update(id, { ...dbUser, profile_image_url: fileUrl });
  }

  @ApiExcludeEndpoint()
  @UseGuards(CookieAuthGuard)
  @Get('users/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiExcludeEndpoint()
  @UseGuards(CookieAuthGuard)
  @Patch('users/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiExcludeEndpoint()
  @UseGuards(CookieAuthGuard)
  @Delete('users/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
