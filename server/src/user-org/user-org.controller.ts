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
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { CookieAuthGuard } from '../auth/guards/cookie-auth.guard';
import { UserOrganization } from './entities/user-org.entitiy';
import { UserOrganizationsService } from './user-org.service';
import type { CreateUserOrganizationDto } from './dto/create-user-org.dto';
import type { UpdateUserOrganizationDto } from './dto/update-user-org.dto';

@Controller('userOrganizations')
export class UserOrganizationsController {
  constructor(private readonly userOrganizationsService: UserOrganizationsService) {}

  @Post()
  async create(
    @Body() createUserOrganizationsDto: CreateUserOrganizationDto,
  ): Promise<UserOrganization> {
    try {
      const user_org = await this.userOrganizationsService.create(createUserOrganizationsDto);
      return user_org;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT,
      );
    }
  }

  @UseGuards(CookieAuthGuard)
  @Get()
  async findAll(): Promise<UserOrganization[]> {
    const allUserOrgs = await this.userOrganizationsService.findAll();
    return allUserOrgs;
  }

  @UseGuards(CookieAuthGuard)
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

  @UseGuards(CookieAuthGuard)
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

  @UseGuards(CookieAuthGuard)
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
