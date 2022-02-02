import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
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
      //console.log(req.body.email)
      let user;
      try {
        user = await this.usersService.findByEmail(req.body.email);
      } catch(e) {
        //console.error(e);
      }
      if (user) {
       // console.log("got a user")
        //console.log(user)
        //great send email if you get here 
        //that email has a link to take you to update your password
      } else {
       // console.log("No User")
       //do nothing
      }
      //reading online it looks like I might need to  make a table for reset-password. 
      //delete entries after password is reset OR if user is not found?
      //this is basically to create and keep track of a token (that will expire)
      //I need to read more
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
