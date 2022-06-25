import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationsService } from 'src/organizations/organizations.service';
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
    private organizationsService: OrganizationsService,
  ) {}

  async create(createUserOrganizationDto: CreateUserOrganizationDto): Promise<UserOrganization> {
    const userExists = await this.userService.userEmailExists(createUserOrganizationDto.user.email);
    if (userExists) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'A user with this email already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    const existingOrg = await this.organizationsService.countByNameOrEin(
      createUserOrganizationDto.organization.name,
      createUserOrganizationDto.organization.ein,
    );
    if (existingOrg > 0) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'An organization with this name and EIN already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    if (!userExists && !existingOrg) {
      const user = await this.userService.create(createUserOrganizationDto.user);
      const organization = await this.organizationsService.create(
        createUserOrganizationDto.organization,
      );

      try {
        return await this.userOrganizationsRepository.save({ user, organization });
      } catch (err) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'This user is already related to this organization',
          },
          HttpStatus.CONFLICT,
        );
      }
    }
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
