import { Injectable } from '@nestjs/common';
import { User } from './interface/auth.interface';

@Injectable()
export class AuthService {
    private readonly users:User[] = [];

    signUp(user:User):User {
        const existingUser = this.users.find((oneUser) => oneUser.name === user.name);
        
    }
}
