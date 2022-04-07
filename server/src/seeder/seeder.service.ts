import { Injectable, Logger } from '@nestjs/common';
import { seedUsers } from '../database/seeding/seed-data';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Connection, EntityMetadata, Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(private readonly userService: UsersService, private readonly connx: Connection) {}

  /**
   * Seeds demo users if they don't exist
   */
  public async seedUsersAsync(): Promise<void> {
    seedUsers().forEach(async (user: CreateUserDto) => {
      const exists = await this.userService.userEmailExists(user.email);
      if (!exists) {
        Logger.log('Seeding Users', SeederService.name);
        this.userService.create(user).catch((err) => Logger.log(err));
      }
    });
  }

  /**
   * removes all data in DB in a cascading style
   */
  public truncateFromAllTables(): void {
    Logger.log('Truncating all tables in cascade', SeederService.name);
    const entities: EntityMetadata[] = this.connx.entityMetadatas;
    for (const entity of entities) {
      const repository: Repository<unknown> = this.connx.getRepository(entity.name);
      repository.query(`TRUNCATE ${entity.tableName} CASCADE;`);
    }
  }
}
