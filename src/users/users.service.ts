import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) {}

    async getAll(): Promise<UserDTO[]> {
        const items = await this.userRepo.find();
        return items.map(e => UserDTO.fromEntity(e));
    }

    get(id: string): Promise<User> {
        return this.userRepo.findOne(id);
    }

    getByUsername(username: string): Promise<User> {
        return this.userRepo.findOne({ first_name: username });
    }

    remove(id: string): Promise<DeleteResult> {
        return this.userRepo.delete(id);
    }

    save(user: User): Promise<User> {
        return this.userRepo.save(user);
    }
}
