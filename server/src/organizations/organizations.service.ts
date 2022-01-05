import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Organization } from './entities/organization.entity';
import fetch from 'node-fetch';

export type EINCheck = {
  einExists: boolean;
  proPublicaName: string;
}

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization) private organizationsRepository: Repository<Organization>
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationsRepository.save(createOrganizationDto);
  }

  async checkEIN(ein: number): Promise<EINCheck> {
    let einObj = {
      einExists: false,
      proPublicaName: ""
    }

    try {
      const res = await fetch(`https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}.json`)
      const org = await res.json()
      if (org) {
        einObj.einExists = true;
        einObj.proPublicaName = org.organization.name;
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
      throw new NotFoundException('Organization Not Found');
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
