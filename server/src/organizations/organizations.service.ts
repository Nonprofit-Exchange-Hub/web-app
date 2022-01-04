import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Organization } from './entities/organization.entity';
import fetch from 'node-fetch';

type EINCheck {
  verified: boolean;
  einExists: boolean;
  actualName: string;
}


@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization) private organizationsRepository: Repository<Organization>
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.organizationsRepository.create(createOrganizationDto);

    const einCheck = await this.checkEIN(organization.name, organization.ein);

    if (einCheck.verified === true) {
      console.log("Successfully verified in Pro Publica db")
      return this.organizationsRepository.save(organization)
    } else if (einCheck.verified === false && einCheck.einExists === true) {
      console.log("EIN exists in Pro Publica db. Name does not match")
      throw new HttpException(`Invalid name. Did you mean ${einCheck.actualName}?`, HttpStatus.EXPECTATION_FAILED)
    } else {
      console.log("EIN does not exist in Pro Public db.")
      throw new NotFoundException('Organization not found')
    }

  }

  async checkEIN(name: string, ein: number): Promise<EINCheck> {
    let resultObj = {
      verified: false,
      einExists: false,
      actualName: ""
    }

    try {
      const res = await fetch(`https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}.json`)
      const org = await res.json()
      if (org && org.organization.name === name) {
        resultObj.verified = true;
        resultObj.einExists = true;
        resultObj.actualName = name
      } else if (org && org.organization.name !== name) {
        resultObj.verified = false;
        resultObj.einExists = true;
        resultObj.actualName = org.organization.name;
      } 
    } catch (err) {
      console.log(err.message)
    }
    return resultObj
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
