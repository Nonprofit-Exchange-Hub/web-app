import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LoginStrategy_base: new (...args: any[]) => Strategy;
export declare class LoginStrategy extends LoginStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<any>;
}
export {};
