import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Serialize } from 'src/serializer/serializer.interceptor';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LoginUserDto } from 'src/user/dtos/login-user.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('api/auth')
@ApiBearerAuth('JWT')
@Serialize(UserDto)
export class AuthController {

    constructor(private userService: UserService,
                private  authService: AuthService){}

    @Post('/signup')
    async signUp(@Body() body: CreateUserDto)
    {
        const user = await this.authService.signUp(body.email, body.password)

        return user
    }

    @Post('/login')
    async login(@Body() body: LoginUserDto)
    {
        const user = await this.authService.validateUser(body)
        return user
    }

    // @Get('/users')
    // @UseGuards(JwtAuthGuard)
    // async getUsers()
    // {
    //     const users = await this.userService.findAll()
    //     return users
    // }
}
