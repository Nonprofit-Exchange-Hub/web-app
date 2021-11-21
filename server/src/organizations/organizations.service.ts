import { Injectable, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity'

@Injectable()
export class OrganizationsService {
  constructor(@InjectRepository(Organization) private organizationsRepository: Repository<Organization>) { }

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      return await this.organizationsRepository.save(createOrganizationDto);
    } catch (err) {
      throw new HttpException({ status: HttpStatus.CONFLICT, message: err.message }, HttpStatus.CONFLICT)
    }
  }

  findAll() {
    return this.organizationsRepository.find();
  }

  findOne(id: number) {
    return this.organizationsRepository.findOne(id);
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    await this.organizationsRepository.update(id, updateOrganizationDto);
    return this.organizationsRepository.findOne(id);
  }

  remove(id: number) {
    return this.organizationsRepository.delete(id);
  }
}
