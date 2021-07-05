import { UsersService } from '../users-old/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    createJwt(user: any): Promise<{
        access_token: string;
    }>;
}
