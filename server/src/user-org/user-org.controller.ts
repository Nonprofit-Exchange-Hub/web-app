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
import { UsersService } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';

@Controller('userOrganizations')
export class UserOrganizationsController {
  constructor(
    private readonly userOrganizationsService: UserOrganizationsService,
    private readonly userService: UsersService,
    private readonly orgService: OrganizationsService,
  ) {}

  @Post()
  async create(
    @Body() createUserOrganizationsDto: CreateUserOrganizationDto,
  ): Promise<UserOrganization> {
    if (await this.userService.userEmailExists(createUserOrganizationsDto.user.email)) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: 'Email already exists' },
        HttpStatus.CONFLICT,
      );
    }

    if (
      (await this.orgService.countByNameOrEin(
        createUserOrganizationsDto.organization.name,
        createUserOrganizationsDto.organization.ein,
      )) > 0
    ) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: 'This organization already exists' },
        HttpStatus.CONFLICT,
      );
    }

    try {
      const userOrg = await this.userOrganizationsService.create({
        ...createUserOrganizationsDto,
        role: Role.owner,
        approvalStatus: ApprovalStatus.pending,
      });
      return userOrg;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
