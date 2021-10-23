import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';

import { LoginAuthGuard } from './guards/login-auth.guard';
import { AuthService } from './auth.service';
import { strict } from 'assert';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('test')
    @UseGuards(LoginAuthGuard)
    async authTest() {
        return {
            message: 'ヽ(•‿•)ノ',
        };
    }

    @Post('login')
    @UseGuards(LoginAuthGuard)
    async login(@Request() req, @Response({passthrough: true}) res) {
       
        const token = await this.authService.createJwt(req.user);
        console.log(token)

        res.cookie('token', token, {httpOnly: true, sameSite: 'strict', secure: true})
        // res.status(200).send('Testing')
        // res.cookie('test', 'abcd')
        // console.log('Hello World')
        return {status: 200, access_token: await this.authService.createJwt(req.user)};
    }
}
