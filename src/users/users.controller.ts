import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Res,
    Render,
    Param,
    UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private serv: UsersService) { }

    @Post()
    async create(@Res() res, @Body('first_name') firstName, @Body('last_name') lastName) {
        const user = new User();
        user.first_name = firstName;
        user.last_name = lastName;
        user.is_active = true;
        const savedUser = await this.serv.save(user);
        return res.redirect(`/user?id=${savedUser.id}`);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getById(@Param() params) {
        return this.serv.get(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @Render('user')
    get(@Query('id') id) {
        return this.serv.get(id);
    }
}
