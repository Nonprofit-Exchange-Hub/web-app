import { Injectable, Logger } from '@nestjs/common';
import { users } from 'src/database/seeding/dev-seed';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeederService {
  constructor(private readonly logger: Logger, private readonly userService: UsersService) {}

  public async seedAsync(): Promise<void> {
    users().forEach(async (user: CreateUserDto) => {
      Logger.log(user.email);
      this.userService
        .create(user)
        .then(() => Logger.debug('Users Seeded'))
        .catch((err) => Logger.debug(err));
    });
  }
}
