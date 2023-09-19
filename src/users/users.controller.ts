import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { SignUpDTO } from './dto/signup.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('signup')
    signUp(@Body() signUpDTO: SignUpDTO): Promise<User> {
        return this.usersService.signUp(signUpDTO);
    }
}
