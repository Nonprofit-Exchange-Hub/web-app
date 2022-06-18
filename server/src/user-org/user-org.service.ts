import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/organizations/entities/organization.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import type { DeleteResult, Repository } from 'typeorm';

import { CreateUserOrganizationDto } from './dto/create-user-org.dto';
import { UpdateUserOrganizationDto } from './dto/update-user-org.dto';
import { UserOrganization } from './entities/user-org.entity';

@Injectable()
export class UserOrganizationsService {
  constructor(
    @InjectRepository(UserOrganization)
    private userOrganizationsRepository: Repository<UserOrganization>,
    private userService: UsersService,
    private organizationsSrvice: OrganizationsService,
  ) {}

  async create(createUserOrganizationDto: CreateUserOrganizationDto): Promise<UserOrganization> {
    const user = await this.userService.create(createUserOrganizationDto.user);
    const organization = await this.organizationsSrvice.create(
      createUserOrganizationDto.organization,
    );

    return await this.userOrganizationsRepository.save({ user, organization });
  }

  async findAll(): Promise<UserOrganization[]> {
    const allUserOrgs = await this.userOrganizationsRepository.find();
    return allUserOrgs;
  }

  async findOne(id: number): Promise<UserOrganization> {
    const userOrg = await this.userOrganizationsRepository.findOne(id);
    return userOrg;
  }

  async update(
    id: number,
    updateUserOrganizationsDto: UpdateUserOrganizationDto,
  ): Promise<UserOrganization> {
    await this.userOrganizationsRepository.update(id, updateUserOrganizationsDto);
    return this.userOrganizationsRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    const removedUserOrg = await this.userOrganizationsRepository.delete(id);
    return removedUserOrg;
  }
}
