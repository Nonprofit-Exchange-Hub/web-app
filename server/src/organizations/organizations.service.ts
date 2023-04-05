import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Raw, Repository } from 'typeorm';
import fetch from 'node-fetch';

import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { GetOrganizationDto } from './dto/get-organization.dto';
import { CategoriesService } from '../categories/categories.service';

export type PropublicaOrg = {
  ein: string;
  name: string;
};

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization) private organizationsRepository: Repository<Organization>,
    private categoriesService: CategoriesService,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const exists = await this.countByNameOrEin(
      createOrganizationDto.name,
      createOrganizationDto.ein,
    );

    if (exists > 0) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'This organization already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    return this.organizationsRepository.save(createOrganizationDto);
  }

  async getProPublicaOrg(ein: string): Promise<PropublicaOrg> {
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

  find(getOrganizationDto: GetOrganizationDto): Promise<Organization[]> {
    const { limit, offset, search } = getOrganizationDto;
    const searches = [
      { name: Raw((alias) => `LOWER(${alias}) LIKE '%${search.toLowerCase()}%'`) },
      { doing_business_as: Raw((alias) => `LOWER(${alias}) LIKE '%${search.toLowerCase()}%'`) },
      { description: Raw((alias) => `LOWER(${alias}) LIKE '%${search.toLowerCase()}%'`) },
    ];

    return this.organizationsRepository.find({
      ...(search ? { where: searches } : {}),
      order: { name: 'ASC' },
      skip: offset,
      take: limit,
    });
  }

  findOne(id: number): Promise<Organization> {
    return this.organizationsRepository.findOneBy({ id });
  }

  async validateOrgCategories(interests: string[]) {
    return this.categoriesService.validateCategories(interests);
  }

  async countByNameOrEin(name: string, ein: string): Promise<number> {
    return this.organizationsRepository.count({
      where: [{ name }, { ein }],
    });
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
