import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationsService } from '../organizations/organizations.service';
import { UsersService } from '../users/users.service';

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
    private organizationsService: OrganizationsService,
  ) {}

  async create(createUserOrganizationDto: CreateUserOrganizationDto): Promise<UserOrganization> {
    const userExists = this.userService.userEmailExists(createUserOrganizationDto.user.email);

    const existingOrg = this.organizationsService.countByNameOrEin(
      createUserOrganizationDto.organization.name,
      createUserOrganizationDto.organization.ein,
    );

    const [userExistsAsync, existingOrgAsync] = await Promise.all([userExists, existingOrg]);

    if (userExistsAsync && existingOrgAsync > 0) {
      return null;
    } else {
      const user = await this.userService.create(createUserOrganizationDto.user);
      const organization = await this.organizationsService.create(
        createUserOrganizationDto.organization,
      );

      try {
        return await this.userOrganizationsRepository.save({
          ...createUserOrganizationDto,
          id: 0,
          user: { ...user, id: user.id ?? 0 },
          organization: { ...organization, id: organization.id ?? 0 },
        });
      } catch (err) {
        Logger.error(err, UserOrganizationsService.name);
      }
    }
  }

  async findAll(): Promise<UserOrganization[]> {
    const allUserOrgs = await this.userOrganizationsRepository.find();
    return allUserOrgs;
  }

  async findOne(id: number): Promise<UserOrganization> {
    const userOrg = await this.userOrganizationsRepository.findOneBy({ id });
    return userOrg;
  }

  async update(
    id: number,
    updateUserOrganizationsDto: UpdateUserOrganizationDto,
  ): Promise<UserOrganization> {
    await this.userOrganizationsRepository.update(id, updateUserOrganizationsDto);
    return this.userOrganizationsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    const removedUserOrg = await this.userOrganizationsRepository.delete(id);
    return removedUserOrg;
  }
}
