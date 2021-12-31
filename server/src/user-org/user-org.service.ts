import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { CreateUserOrganizationDto } from './dto/create-user-org.dto';
import { UpdateUserOrganizationDto } from './dto/update-user-org.dto';
import { UserOrganization } from './entities/user-org.entitiy';

//only changed the names here still need to change logic
@Injectable()
export class UserOrganizationsService {
  constructor(
    @InjectRepository(UserOrganization)
    private userOrganizationsRepository: Repository<UserOrganization>,
  ) { }

  async create(createUserOrganizationDto: CreateUserOrganizationDto) {
    return await this.userOrganizationsRepository.save(createUserOrganizationDto);
  }

  async findAll() {
    const allUserOrgs = await this.userOrganizationsRepository.find();
    return allUserOrgs;
  }

  async findOne(id: number) {
    const userOrg = await this.userOrganizationsRepository.findOne(id);
    return userOrg;
  }

  //TODO: Assess if there is a better way than making two requests.
  async update(id: number, updateUserOrganizationsDto: UpdateUserOrganizationDto) {
    await this.userOrganizationsRepository.update(id, updateUserOrganizationsDto);
    return this.userOrganizationsRepository.findOne(id);
  }

  async remove(id: number) {
    const removedUserOrg = await this.userOrganizationsRepository.delete(id);
    return removedUserOrg;
  }
}
