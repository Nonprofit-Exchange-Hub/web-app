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
      //check database for email. if it exists send an email,  nothing needs to be returned here.
      //if not found do nothing?
      console.log(req.body.email)
      let user = this.usersService.findByEmailNonAsync(req.body.email)
      if (user) {
        console.log(user)
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
