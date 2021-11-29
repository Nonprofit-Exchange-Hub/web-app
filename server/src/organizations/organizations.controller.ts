import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { DeleteResult } from 'typeorm';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) { }

  @Post()
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    try {
      const newOrg = await this.organizationsService.create(createOrganizationDto);
      return newOrg;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT)
    }
  }

  @Get()
  findAll(): Promise<Organization[]> {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    return this.organizationsService.update(+id, updateOrganizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.organizationsService.remove(+id);
  }
}
