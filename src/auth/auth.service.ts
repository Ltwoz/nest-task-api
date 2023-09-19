import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneUser(username);

        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
    }

    async signIn(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
