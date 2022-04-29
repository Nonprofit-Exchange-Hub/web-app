import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { DeleteResult, Repository } from 'typeorm';

import { CreateUserOrganizationDto } from './dto/create-user-organization.dto';
import { UpdateUserOrganizationDto } from './dto/update-user-organization.dto';
import { UserOrganization } from './entities/userOrganization.entity';

@Injectable()
export class UserOrganizationsService {
  constructor(
    @InjectRepository(UserOrganization)
    private userOrganizationsRepository: Repository<UserOrganization>,
  ) {}

  async create(createUserOrganizationDto: CreateUserOrganizationDto): Promise<UserOrganization> {
    return await this.userOrganizationsRepository.save(createUserOrganizationDto);
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
