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
    const organization = this.organizationsRepository.create(createOrganizationDto);

    // verify name & ein before saving:
    const verified = await this.checkEIN(organization.name, organization.ein)
    if (verified) {
      console.log("verified name & ein")
      return this.organizationsRepository.save(organization)
    } else {
      console.log("cannot verify name & ein")
      // handle error here
    }
  }


  // will compare name & ein to the propublica api database:
  async checkEIN(name, ein): Promise<Boolean> {
    console.log("inside checkEIN func:", name, ein)

    // i don't really know how to use map here, but i'm also wondering how to incorporate a json conversion if necessary...i tried to tag on .json() in the map call but it complicated things
    const r = this.httpService.get("https://projects.propublica.org/nonprofits/api/v2/search.json?q=propublica").pipe(map(res => res));
    
    // trying to see what the response data looks like:
    console.log(r)
   
    // or do I need to use subscribe? this didn't work either:
    // await this.httpService.get("https://projects.propublica.org/nonprofits/api/v2/search.json?q=propublica").pipe(map(data => {})).subscribe(result => {
    //   console.log(result);
    // });

    // if they are the same return true. else return false. hardcoded to return false for now:
    return false
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
