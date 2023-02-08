import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { UsersV2Service } from './userv2.service';

@Injectable()
export class AccountManagerService {
  constructor(private usersService: UsersV2Service, private jwtService: JwtService) {}

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
