import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    private users: User[] = [];

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const saltRounds = 10;
        const passwordHash = await hash(createUserDto.password, saltRounds);

        const user: User = {
            ...createUserDto,
            password: passwordHash,
            id: this.users.length + 1
        }

        this.users.push(user)

        return user
    }

    async getAllUsers(): Promise<User[]> {
        return this.users;
    }
}
