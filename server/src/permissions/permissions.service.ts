import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationsService } from '../organizations/organizations.service';
import { UsersService } from '../users/users.service';

import type { DeleteResult, Repository } from 'typeorm';

import { CreatePermissionsDto } from './dto/create-permissions.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { Permissions } from './entities/permissions.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private permissionsRepository: Repository<Permissions>,
    private userService: UsersService,
    private organizationsService: OrganizationsService,
  ) {}

  async create(createPermissionsDto: CreatePermissionsDto): Promise<Permissions> {
    const userExists = this.userService.userEmailExists(createPermissionsDto.user.email);

    const existingOrg = this.organizationsService.countByNameOrEin(
      createPermissionsDto.organization.name,
      createPermissionsDto.organization.ein,
    );

    const [userExistsAsync, existingOrgAsync] = await Promise.all([userExists, existingOrg]);

    if (userExistsAsync && existingOrgAsync > 0) {
      return null;
    } else {
      const user = await this.userService.create(createPermissionsDto.user);
      const organization = await this.organizationsService.create(
        createPermissionsDto.organization,
      );

      try {
        return await this.permissionsRepository.save({
          ...createPermissionsDto,
          id: 0,
          user: { ...user, id: user.id ?? 0 },
          organization: { ...organization, id: organization.id ?? 0 },
        });
      } catch (err) {
        Logger.error(err, PermissionsService.name);
      }
    }
  }

  async findAll(): Promise<Permissions[]> {
    const allPermissions = await this.permissionsRepository.find();
    return allPermissions;
  }

  async findOne(id: number): Promise<Permissions> {
    const userOrg = await this.permissionsRepository.findOneBy({ id });
    return userOrg;
  }

  async update(id: number, updatePermissionsDto: UpdatePermissionsDto): Promise<Permissions> {
    await this.permissionsRepository.update(id, updatePermissionsDto);
    return this.permissionsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    const removedPermissions = await this.permissionsRepository.delete(id);
    return removedPermissions;
  }
}
