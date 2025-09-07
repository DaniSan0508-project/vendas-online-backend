import type { CreateUserDto } from './dtos/createUser.dto';
export declare class UserController {
    createUser(createUser: CreateUserDto): Promise<CreateUserDto>;
}
