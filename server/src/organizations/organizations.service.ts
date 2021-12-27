import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Organization } from './entities/organization.entity'
import { HttpService} from '@nestjs/axios';
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { map } from "rxjs/operators";


@Injectable()
export class OrganizationsService {
  constructor(@InjectRepository(Organization) private organizationsRepository: Repository<Organization>, private httpService: HttpService) { }

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    //create first, and then save
    const organization = this.organizationsRepository.create(createOrganizationDto);

    console.log("creating org:", organization.name, organization.ein)
    //here I am just trying to see if I can make an API call here. Currently the api call is hard coded. 
    await console.log(this.checkEIN())

    return this.organizationsRepository.save(organization)
  }

  async checkEIN(): Promise<Observable<AxiosResponse<any>>> {
    const r = await this.httpService.get("https://projects.propublica.org/nonprofits/api/v2/search.json?q=propublica").pipe(map((response: any) => response.json()));
    console.log(r)
    return r
  }

  findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find();
  }

  findOne(id: number): Promise<Organization> {
    return this.organizationsRepository.findOne(id);
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    // save allows us to run hooks, whereas update does not. am i using a hook in this method?
    const org = await this.findOne(id)
    if (!org){
      throw new NotFoundException('organization not found')
    }
    Object.assign(org, updateOrganizationDto)
    return this.organizationsRepository.save(org)
    // await this.organizationsRepository.update(id, updateOrganizationDto);
    // return this.organizationsRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    //remove will let us run a hook. delete does not. do we have a hook we need? 
    const org = await this.findOne(id)
    if (!org){
      throw new NotFoundException('organization not found')
    }
    return this.organizationsRepository.delete(id);
  }
}
