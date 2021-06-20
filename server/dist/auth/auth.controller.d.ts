import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    authTest(): Promise<{
        message: string;
    }>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
