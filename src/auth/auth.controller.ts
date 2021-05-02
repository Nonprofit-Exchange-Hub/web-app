import { Controller, Post, UseGuards } from '@nestjs/common';

import { LoginAuthGuard } from './guards/login-auth.guard';

@Controller('auth')
export class AuthController {
    @Post('test')
    @UseGuards(LoginAuthGuard)
    async authTest() {
        return {
            message: 'ヽ(•‿•)ノ',
        };
    }
}
