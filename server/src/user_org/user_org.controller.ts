import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserOrganizationDto } from './dto/create-user_org.dto';
import { UpdateUserOrganizationDto } from './dto/update-user_org.dto';
import { UserOrganization } from './entities/user_org.entitiy';
import { UserOrganizationsService } from './user_org.service';

@Controller('userOrganizations')
export class UserOrganizationsController {
  constructor(private readonly userOrganizationsService: UserOrganizationsService) { }

  @Post()
  async create(
    @Body() createUserOrganizationsDto: CreateUserOrganizationDto,
  ): Promise<UserOrganization> {
    const user_org = await this.userOrganizationsService.create(createUserOrganizationsDto);
    return user_org;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const allUserOrgs = await this.userOrganizationsService.findAll();
    return allUserOrgs;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userOrg = await this.userOrganizationsService.findOne(+id);
    return userOrg;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserOrganizationDto: UpdateUserOrganizationDto) {
    const updatedUserOrg = await this.userOrganizationsService.update(+id, updateUserOrganizationDto);
    return updatedUserOrg;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedUserOrg = await this.userOrganizationsService.remove(+id);
    return removedUserOrg;
  }
}
