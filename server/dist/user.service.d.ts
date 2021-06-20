import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './user.dto';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    getAll(): Promise<UserDTO[]>;
    get(id: string): Promise<User>;
    remove(id: string): Promise<DeleteResult>;
    save(user: User): Promise<User>;
}
