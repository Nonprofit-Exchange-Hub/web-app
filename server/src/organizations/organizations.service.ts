import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Organization } from './entities/organization.entity';
import fetch from 'node-fetch';

export type PropublicaOrg = {
  ein: string;
  name: string;
};

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization) private organizationsRepository: Repository<Organization>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationsRepository.save(createOrganizationDto);
  }

  async getProPublicaOrg(ein: number): Promise<PropublicaOrg> {
    try {
      const res = await fetch(
        `https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}.json`,
      );
      const org = await res.json();
      if (org) {
        return {
          ein: org.organization.ein,
          name: org.organization.name,
        };
      }
    } catch (err) {
      throw new NotFoundException('Organization Not Found in Propublica API');
    }
  }

  findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find();
  }

  findOne(id: number): Promise<Organization> {
    return this.organizationsRepository.findOneBy({ id });
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
