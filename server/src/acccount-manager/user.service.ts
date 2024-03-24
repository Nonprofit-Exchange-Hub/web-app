import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserInternal, UpdateUserInternal } from './dto/create-user.internal';
import { User } from './entities/user.entity';

const { BCRYPT_WORK_FACTOR = '10' } = process.env;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserInternal): Promise<User> {
    try {
      const hashedPw = await bcrypt.hash(createUserDto.password, parseInt(BCRYPT_WORK_FACTOR));
      createUserDto.password = hashedPw;
      const user = await this.usersRepository.save(createUserDto);
      return user;
    } catch (err) {
      Logger.error(`${err.message}: \n${err.stack}`, UsersService.name);
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: 'Email already exists' },
        HttpStatus.CONFLICT,
      );
    }
  }

  async updatePasswod(id: number, createUserInternal: Partial<CreateUserInternal>): Promise<User> {
    try {
      const hashedPw = await bcrypt.hash(createUserInternal.password, parseInt(BCRYPT_WORK_FACTOR));
      await this.usersRepository.update(id, { password: hashedPw });
      const user = await this.usersRepository.findOneBy({ id });
      delete user.password;
      Logger.log(`Updating password for user: ${id}`);
      return user;
    } catch (err: any) {
      Logger.error(`${err.message}: \n${err.stack}`, UsersService.name);
      throw new Error(`Error updating user password for user ${id}`);
    }
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      delete user.password;
    }
    return user;
  }

  /**
   * Filter users by their interests
   * @param interests
   * @returns list of users matching a list of interest names
   */
  async geUsersByInterests(interests: { names: string[] }): Promise<Omit<User[], 'password'>> {
    return await this.usersRepository.query(
      `SELECT * from users WHERE interests->'names' @> '${JSON.stringify(interests.names)}'::jsonb`,
    );
  }

  async userEmailExists(email: string): Promise<boolean> {
    const usersFound = await this.usersRepository.count({ where: { email } });
    return usersFound > 0;
  }

  // Search database for user with matching email.
  // Returns user on success, throws 404 error if user does not exist
  async findByEmail(email: string, includePw = false): Promise<User | Omit<User, 'password'>> {
    const user = await this.usersRepository.findOneBy({ email });

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
    const user = await this.usersRepository.findOneBy({ firstName });
    delete user.password;
    return user;
  }

  // TODO: Assess if there is a better way than making two requests.
  async update(id: number, updateUserDto: UpdateUserInternal) {
    await this.usersRepository.update(id, updateUserDto);
    const user = await this.usersRepository.findOneBy({ id });
    delete user.password;
    return user;
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
