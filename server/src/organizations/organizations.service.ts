import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Organization } from './entities/organization.entity';
import fetch from 'node-fetch';


@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization) private organizationsRepository: Repository<Organization>
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.organizationsRepository.create(createOrganizationDto);

    const verified = await this.checkEIN(organization.name, organization.ein);

    if (verified === true) {
      console.log('verified name & ein. good to save org in db.');
      // return this.organizationsRepository.save(organization);
      return organization
    } else {
      console.log('cannot verify name & ein');
      console.log(verified)
      return organization
    }

  }

  // will compare name & ein to the propublica api database:
  async checkEIN(name, ein) {
    console.log('inside checkEIN func:', name, ein);
    let result;
    try {
      const res = await fetch(`https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}.json`)
      const org = await res.json()
      if (org && org.organization.name === name) {
        result = true
      } else if (org) {
        result = org.organization.name
      }
    } catch (err) {
      result = err.type
    }
    return result
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
