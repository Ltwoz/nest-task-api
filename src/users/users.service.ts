import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { SignUpDTO } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async signUp(signUpDTO: SignUpDTO): Promise<User> {
        try {
            const { username, password } = signUpDTO;

            const hashedPassword = await bcrypt.hashSync(password, 10);

            const user = this.usersRepository.create({
                username,
                password: hashedPassword,
            });

            return await this.usersRepository.save(user);
        } catch (error) {
            throw new ConflictException({
                message: ['This username already in use'],
            });
        }
    }

    async findOneUser(username: string): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({
            where: { username },
        });

        return user;
    }
}
