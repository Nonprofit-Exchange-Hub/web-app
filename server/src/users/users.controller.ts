import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'accept_terms'>> {
    const user = await this.usersService.create(createUserDto);
    delete user.password;
    return user;
  }

  @Post('reset_password')
  async resetPassword(@Request() req) {
      console.log(req.body.email)
      let user;
      try {
        user = await this.usersService.findByEmail(req.body.email);
      } catch(e) {
        console.error(e);
      }
      if (user) {
        console.log("got a user")
        console.log(user)
        //great send email
      } else {
        console.log("No User")
      }
      //maybe make a table for reset-password. delete entries after password is reset OR if user is not found?
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
