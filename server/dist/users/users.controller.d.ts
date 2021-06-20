import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private serv;
    constructor(serv: UsersService);
    create(res: any, firstName: any, lastName: any): Promise<any>;
    getById(params: any): Promise<User>;
    get(id: any): Promise<User>;
}
