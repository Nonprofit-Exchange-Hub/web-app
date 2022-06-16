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
  ParseIntPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { UserOrganization } from './entities/user-org.entity';
import { UserOrganizationsService } from './user-org.service';
import { CreateUserOrganizationDto } from './dto/create-user-org.dto';
import { UpdateUserOrganizationDto } from './dto/update-user-org.dto';
import { ApprovalStatus, Role } from './constants';

@Controller('userOrganizations')
export class UserOrganizationsController {
  constructor(private readonly userOrganizationsService: UserOrganizationsService) {}

  @Post()
  async create(
    @Body() createUserOrganizationsDto: CreateUserOrganizationDto,
  ): Promise<UserOrganization> {
    try {
      const userOrg = await this.userOrganizationsService.create({
        role: Role.owner,
        approvalStatus: ApprovalStatus.pending,
        ...createUserOrganizationsDto,
      });
      return userOrg;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserOrganization> {
    const userOrg = await this.userOrganizationsService.findOne(id);
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
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserOrganizationDto: UpdateUserOrganizationDto,
  ): Promise<UserOrganization> {
    try {
      const updatedUserOrg = await this.userOrganizationsService.update(
        id,
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
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    const userOrgToDelete = await this.userOrganizationsService.remove(id);
    if (userOrgToDelete.affected === 0) {
      throw new HttpException(
        { staus: HttpStatus.NOT_FOUND, message: 'User relation to Organization not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return userOrgToDelete;
  }
}
