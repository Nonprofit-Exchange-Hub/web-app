import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    try {
      const hash = await this.usersService.findPwByEmail(email);

      // Check if password from client matches password associated with
      // the user retrieved from database
      const isMatch = await bcrypt.compare(password, hash);
      if (isMatch) {
        return true;
      } else {
        throw new Error();
      }
    } catch (err) {
      err.status = HttpStatus.UNAUTHORIZED;
      err.response.status = HttpStatus.UNAUTHORIZED;
      throw err;
    }
  }

  async createJwt(user: User) {
    delete user.password;
    return this.jwtService.sign({ ...user }, { expiresIn: '1h', secret: jwtConstants.secret });
  }
}
