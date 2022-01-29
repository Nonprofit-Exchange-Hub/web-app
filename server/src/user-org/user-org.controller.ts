import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { UserOrganization } from './entities/user-org.entitiy';
import { UserOrganizationsService } from './user-org.service';
import { CreateUserOrganizationDto } from './dto/create-user-org.dto';
import { UpdateUserOrganizationDto } from './dto/update-user-org.dto';

@Controller('userOrganizations')
export class UserOrganizationsController {
  constructor(private readonly userOrganizationsService: UserOrganizationsService) {}

  @Post()
  async create(
    @Body() createUserOrganizationsDto: CreateUserOrganizationDto,
  ): Promise<UserOrganization> {
    try {
      const userOrg = await this.userOrganizationsService.create(createUserOrganizationsDto);
      return userOrg;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Get()
  async findAll(): Promise<UserOrganization[]> {
    const allUserOrgs = await this.userOrganizationsService.findAll();
    return allUserOrgs;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserOrganization> {
    const userOrg = await this.userOrganizationsService.findOne(parseInt(id, 10));
    if (!userOrg) {
      throw new HttpException(
        { staus: HttpStatus.NOT_FOUND, message: 'User relation to Organization not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return userOrg;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserOrganizationDto: UpdateUserOrganizationDto,
  ): Promise<UserOrganization> {
    try {
      const updatedUserOrg = await this.userOrganizationsService.update(
        parseInt(id, 10),
        updateUserOrganizationDto,
      );
      return updatedUserOrg;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    const userOrgToDelete = await this.userOrganizationsService.remove(parseInt(id));
    if (userOrgToDelete.affected === 0) {
      throw new HttpException(
        { staus: HttpStatus.NOT_FOUND, message: 'User relation to Organization not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return userOrgToDelete;
  }
}
