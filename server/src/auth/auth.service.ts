import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        // Check if user with email exists in database
        const user = await this.usersService.findByEmail(email);

        // Check if password from client matches password associated with
        // the user retrieved from database
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            const { password, ...result } = user;
            return result;
        }
        else {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'Invalid password',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

    async createJwt(user: any) {
        const payload = {id:user.id, email:user.email};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
