import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import type { Repository } from 'typeorm';
import { CreateUserOrganizationDto } from './dto/create-user_org.dto';
import { UpdateUserOrganizationDto } from './dto/update-user_org.dto';
import { UserOrganization } from './entities/user_org.entitiy';

//only changed the names here still need to change logic
@Injectable()
export class UserOrganizationsService {
    constructor(@InjectRepository(UserOrganization) private userOrganizationsRepository: Repository<UserOrganization>) { }

    async create(createUserOrganizationDto: CreateUserOrganizationDto) {
        return await this.userOrganizationsRepository.save(createUserOrganizationDto);
    }

    findAll() {
        return this.userOrganizationsRepository.find();
    }

    findOne(id: number) {
        return this.userOrganizationsRepository.findOne(id);
    }

    //TODO: Assess if there is a better way than making two requests.
    async update(id: number, updateUserOrganizationsDto: UpdateUserOrganizationDto) {
        await this.userOrganizationsRepository.update(id, updateUserOrganizationsDto);
        return this.userOrganizationsRepository.findOne(id);
    }

    remove(id: number) {
        return this.userOrganizationsRepository.delete(id);
    }
}
