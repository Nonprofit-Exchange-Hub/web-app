import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserOrganizationDto } from './dto/create-user_org.dto';
import { UpdateUserOrganizationDto } from './dto/update-user_org.dto';
import { UserOrganization } from './entities/user_org.entitiy';
import { UserOrganizationsService } from './user_org.service';

@Controller('userOrganizations')
export class UserOrganizationsController {
  constructor(private readonly userOrganizationsService: UserOrganizationsService) {}

  @Post()
  async create(
    @Body() createUserOrganizationsDto: CreateUserOrganizationDto,
  ): Promise<UserOrganization> {
    const user_org = await this.userOrganizationsService.create(createUserOrganizationsDto);
    return user_org;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userOrganizationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userOrganizationsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserOrganizationDto: UpdateUserOrganizationDto) {
    return this.userOrganizationsService.update(+id, updateUserOrganizationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userOrganizationsService.remove(+id);
  }
}
