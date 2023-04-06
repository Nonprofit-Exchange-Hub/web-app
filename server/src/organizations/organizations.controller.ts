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
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from '../transactions/transactions.service';
import { Transaction } from '../transactions/entities/transaction.entity';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
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

  @Get('/:id/transactions')
  orgInbox(@Param('id') org_id: number): Promise<Transaction[]> {
    return this.transactionsService.find_by_org_with_latest_message(org_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.organizationsService.remove(+id);
  }
}
