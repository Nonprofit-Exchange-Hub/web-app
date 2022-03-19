import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm/repository/Repository';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSansPasswordDto } from './dto/user-sans-password.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPw = await bcrypt.hash(
        createUserDto.password,
        parseInt(process.env.BCRYPT_WORK_FACTOR),
      );
      createUserDto.password = hashedPw;
      return await this.usersRepository.save(createUserDto);
    } catch (err) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: 'Email already exists' },
        HttpStatus.CONFLICT,
      );
    }
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  // gets just pw property from user by email
  async findPwByEmail(email: string): Promise<string> {
    const { password } = await this.usersRepository.findOneOrFail({
      where: { email },
      select: ['password'],
    });
    return password;
  }

  // gets user, sans pw property
  // Search database for user with matching email
  // Returns user on success, throws 404 error if user does not exist
  async findByEmail(email: string): Promise<UserSansPasswordDto> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Email not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    delete user.password;
    return user as UserSansPasswordDto;
  }
  //Change to whatever the display name ends up being.
  findByUsername(first_name: string) {
    return this.usersRepository.findOne({ first_name });
  }

  //TODO: Assess if there is a better way than making two requests.
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne(id);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
