import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  BadRequestException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { GetOrganizationDto } from './dto/get-organization.dto';
import { Organization } from './entities/organization.entity';
import { DeleteResult } from 'typeorm';
import { PropublicaOrg } from './organizations.service';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an organization.' })
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
  @ApiOperation({ summary: 'Fetch organizations.' })
  find(@Query() getOrganizationDto: GetOrganizationDto): Promise<Organization[]> {
    return this.organizationsService.find(getOrganizationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch organizations via ID.' })
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationsService.findOne(+id);
  }

  @Get('ein/:ein')
  @ApiOperation({ summary: 'Fetch Propublica organization via EIN.' })
  getProPublicaOrg(@Param('ein') ein: string): Promise<PropublicaOrg> {
    return this.organizationsService.getProPublicaOrg(ein);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an organization.' })
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationsService.update(+id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization.' })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.organizationsService.remove(+id);
  }
}
