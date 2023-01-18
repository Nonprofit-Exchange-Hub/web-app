import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'>> {
    try {
      const user = (await this.usersService.findByEmail(email, true)) as User;

      // Check if password from client matches password associated with
      // the user retrieved from database
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        delete user.password;
        return user;
      } else {
        throw new Error();
      }
    } catch (err) {
      err.status = HttpStatus.UNAUTHORIZED;
      err.response.status = HttpStatus.UNAUTHORIZED;
      throw err;
    }
  }

  async createJwt(user: Omit<User, 'password'>) {
    return this.jwtService.sign({ ...user }, { expiresIn: '1h', secret: process.env.JWT_SECRET });
  }
}
