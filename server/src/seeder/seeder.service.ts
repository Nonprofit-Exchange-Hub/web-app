import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/database/seeding/dev-seed';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  public async seedAsync(): Promise<void> {
    await this.userRepo.create(users());
  }
}
