import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';

import type { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'>> {
    // Check if user with email exists in database
    let user: User;
    try {
      user = await this.usersService.findByEmail(email);
    } catch (err) {
      err.status = HttpStatus.UNAUTHORIZED;
      err.response.status = HttpStatus.UNAUTHORIZED;
      throw err;
    }

    // Check if password from client matches password associated with
    // the user retrieved from database
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      delete user.password;
      return user;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async createJwt(user: User) {
    delete user.password;
    return this.jwtService.sign({ user }, { secret: jwtConstants.secret });
  }
}
