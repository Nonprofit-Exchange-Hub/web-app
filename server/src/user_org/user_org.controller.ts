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
  UseGuards
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

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
    try {
      const user_org = await this.userOrganizationsService.create(createUserOrganizationsDto);
      return user_org;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT,
      )
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const allUserOrgs = await this.userOrganizationsService.findAll();
    return allUserOrgs;
  }

  @UseGuards(JwtAuthGuard)
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


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateUserOrganizationDto: UpdateUserOrganizationDto,
  ): Promise<UserOrganization> {
    try {
      const updatedUserOrg = await this.userOrganizationsService.update(
        parseInt(id, 10),
        UpdateUserOrganizationDto
      );
      return updatedUserOrg;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
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

