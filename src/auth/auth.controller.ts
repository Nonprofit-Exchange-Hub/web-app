import { Controller, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    @Post('test')
    @UseGuards(LocalAuthGuard)
    async authTest() {
        return {
            message: 'ヽ(•‿•)ノ',
        };
    }
}
