import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Organization } from './entities/organization.entity';


@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization) private organizationsRepository: Repository<Organization>
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.organizationsRepository.create(createOrganizationDto);

    // verify name & ein before saving:
    const verified = await this.checkEIN(organization.name, organization.ein);
    // if verified, return org, 
    // if verified && 
    // but should this logic be in my other function? i think so! 
    if (verified) {
      console.log('verified name & ein');
      // return this.organizationsRepository.save(organization);
      return organization
    } else {
      console.log('cannot verify name & ein');
      return organization
    }
  }

  // will compare name & ein to the propublica api database:
  async checkEIN(name, ein): Promise<boolean> {
    console.log('inside checkEIN func:', name, ein);
    // put fetch here
    return false;
  }

  findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find();
  }

  findOne(id: number): Promise<Organization> {
    return this.organizationsRepository.findOne(id);
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    // save allows us to run hooks, whereas update does not. am i using a hook in this method?
    const org = await this.findOne(id);
    if (!org) {
      throw new NotFoundException('organization not found');
    }
    Object.assign(org, updateOrganizationDto);
    return this.organizationsRepository.save(org);
    // await this.organizationsRepository.update(id, updateOrganizationDto);
    // return this.organizationsRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    //remove will let us run a hook. delete does not. do we have a hook we need?
    const org = await this.findOne(id);
    if (!org) {
      throw new NotFoundException('organization not found');
    }
    return this.organizationsRepository.delete(id);
  }
}
