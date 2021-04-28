import { Get, Controller, Post, Render, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render('index')
    root() {
        return {
            message: this.appService.getHello()
        };
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/test')
    async authTest() {
        return {
            message: 'ヽ(•‿•)ノ',
        };
    }
}