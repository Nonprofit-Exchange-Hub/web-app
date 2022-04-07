import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm/repository/Repository';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      const hashedPw = await bcrypt.hash(
        createUserDto.password,
        parseInt(process.env.BCRYPT_WORK_FACTOR),
      );
      createUserDto.password = hashedPw;
      const user = await this.usersRepository.save(createUserDto);
      delete user.password;
      return user;
    } catch (err) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: 'Email already exists' },
        HttpStatus.CONFLICT,
      );
    }
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne(id);
    delete user.password;
    return user;
  }

  async userEmailExists(email: string): Promise<boolean> {
    const usersFound = await this.usersRepository.count({ where: { email } });
    return usersFound > 0;
  }

  // Search database for user with matching email.
  // Returns user on success, throws 404 error if user does not exist
  async findByEmail(email: string, includePw = false): Promise<User | Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Email not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!includePw) {
      delete user.password;
    }
    return user;
  }
  // Change to whatever the display name ends up being.
  async findByUsername(firstName: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ firstName });
    delete user.password;
    return user;
  }

  // TODO: Assess if there is a better way than making two requests.
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    const user = await this.usersRepository.findOne(id);
    delete user.password;
    return user;
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
