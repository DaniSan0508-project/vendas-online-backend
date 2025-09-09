import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor
        (
            @InjectRepository(UserEntity)
            private readonly userRepository: Repository<UserEntity>,
        ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltRounds = 10;
        const passwordHash = await hash(createUserDto.password, saltRounds);

        return this.userRepository.save({
            ...createUserDto,
            type_user: 1,
            password: passwordHash,
        });

    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}
