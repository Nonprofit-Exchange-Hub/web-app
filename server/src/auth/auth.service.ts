import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
<<<<<<< HEAD
import { jwtConstants } from './constants';
=======
import { JwtService } from '@nestjs/jwt';
>>>>>>> updated import paths in user and auth service

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
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
    const isMatch = await bcrypt.compare(pass, user.password);
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
    return this.jwtService.sign({ ...user }, { secret: jwtConstants.secret });
  }
}
