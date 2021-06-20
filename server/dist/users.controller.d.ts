import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UsersController {
    private serv;
    constructor(serv: UserService);
    create(res: any, firstName: any, lastName: any): Promise<any>;
    getById(params: any): Promise<User>;
    get(id: any): Promise<User>;
}
