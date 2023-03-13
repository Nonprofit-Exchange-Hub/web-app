import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { GetOrganizationDto } from './dto/get-organization.dto';
import { Organization } from './entities/organization.entity';
import { DeleteResult } from 'typeorm';
import { PropublicaOrg } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    if (createOrganizationDto.categories) {
      const res = await this.organizationsService.validateOrgCategories(
        createOrganizationDto.categories.names,
      );
      if (!res) {
        throw new BadRequestException('Invalid Categories');
      }
    }
    try {
      const newOrg = await this.organizationsService.create(createOrganizationDto);
      return newOrg;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: `${error}` },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Get()
  find(@Query() getOrganizationDto: GetOrganizationDto): Promise<Organization[]> {
    return this.organizationsService.find(getOrganizationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationsService.findOne(+id);
  }

  @Get('ein/:ein')
  getProPublicaOrg(@Param('ein') ein: string): Promise<PropublicaOrg> {
    return this.organizationsService.getProPublicaOrg(ein);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationsService.update(+id, updateOrganizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.organizationsService.remove(+id);
  }
}
