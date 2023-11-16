import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class AccountManagerService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private categoriesService: CategoriesService,
  ) {}

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
        Logger.error(`Error validating login for user ${email}`, AccountManagerService.name);
        throw new Error('Error Validating user login');
      }
    } catch (err) {
      return null;
    }
  }

  async validateInterests(interests: string[]) {
    return this.categoriesService.validateCategories(interests);
  }

  async createJwt(user: Omit<User, 'password'>) {
    return this.jwtService.sign({ ...user }, { expiresIn: '1h', secret: process.env.JWT_SECRET });
  }
}
