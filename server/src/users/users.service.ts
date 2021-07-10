import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
    create(createUserDto: CreateUserDto) {
        return this.usersRepository.save(createUserDto)
    }

    findAll() {
        return this.usersRepository.find();
    }

    findOne(id: number) {
        return this.usersRepository.findOne(id);
    }
    //Change to whatever the display name ends up being.
    findByUsername(first_name: string) {
        return this.usersRepository.findOne({first_name});
    }

    //TODO: Assess if there is a better way than making two requests.
    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.usersRepository.update(id, updateUserDto)
        return this.usersRepository.findOne(id)
    }

    remove(id: number) {
        return this.usersRepository.delete(id);
    }
}
