import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Organization } from './entities/organization.entity';
import fetch from 'node-fetch';

type EINCheck = {
  einExists: boolean;
  actualName: string;
}


@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization) private organizationsRepository: Repository<Organization>
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    // with no other logic, should the exception live in the service or in the controller? Right now I have them in both and am not sure if it makes sense. 
    const organization = this.organizationsRepository.create(createOrganizationDto);
    if (!organization) {
      // change this exception please
      throw new NotFoundException('Organization Not Found');
    }
    return this.organizationsRepository.save(organization);

  }

  async checkEIN(ein: number): Promise<EINCheck> {
    let einObj = {
      einExists: false,
      actualName: ""
    }

    try {
      const res = await fetch(`https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}.json`)
      const org = await res.json()
      if (org) {
        einObj.einExists = true;
        einObj.actualName = org.organization.name;
      } 
    } catch (err) {
      console.log(err.message)
    }
    return einObj
  }

  findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find();
  }

  findOne(id: number): Promise<Organization> {
    return this.organizationsRepository.findOne(id);
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    const org = await this.findOne(id);
    if (!org) {
      throw new NotFoundException('organization not found');
    }
    Object.assign(org, updateOrganizationDto);
    return this.organizationsRepository.save(org);
  }

  async remove(id: number): Promise<DeleteResult> {
    const org = await this.findOne(id);
    if (!org) {
      throw new NotFoundException('Organization Not Found');
    }
    return this.organizationsRepository.delete(id);
  }
}
