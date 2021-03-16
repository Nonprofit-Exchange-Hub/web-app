import { Body, Controller, Get, Post, Query, Res, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

@Controller('user')
export class UsersController {
    constructor(private serv: UserService) { }

    @Post()
    async create(@Res() res, @Body('first_name') firstName, @Body('last_name') lastName) {
        const user = new User();
        user.first_name = firstName;
        user.last_name = lastName;
        user.is_active = true;
        const savedUser = await this.serv.save(user);
        return res.redirect(`/user?id=${savedUser.id}`);
    }

    @Get()
    @Render('user')
    get(@Query('id') id) {
        return this.serv.get(id);
    }
}
