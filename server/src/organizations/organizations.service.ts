import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Organization } from './entities/organization.entity'

@Injectable()
export class OrganizationsService {
  constructor(@InjectRepository(Organization) private organizationsRepository: Repository<Organization>) { }

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    //create first, and then save

    const organization = this.organizationsRepository.create(createOrganizationDto);

    return this.organizationsRepository.save(organization)
  }

  findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find();
  }

  findOne(id: number): Promise<Organization> {
    return this.organizationsRepository.findOne(id);
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    // 
    const org = await this.findOne(id)
    if (!org){
      throw new Error('organization not found')
    }
    Object.assign(org, updateOrganizationDto)
    return this.organizationsRepository.save(org)
    // await this.organizationsRepository.update(id, updateOrganizationDto);
    // return this.organizationsRepository.findOne(id);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.organizationsRepository.delete(id);
  }
}
