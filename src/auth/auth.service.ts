import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LoginUserDto } from 'src/user/dtos/login-user.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
                private readonly jwtService:JwtService){}

    

    async signUp(email: string, password: string)
    {
        try
        {
            const user = await this.userService.findByEmail(email)
            if (user)
            {
                throw new BadRequestException("Email Already in use")
            }
            
            const newUser = await this.userService.create(email, password)

            const token = this.generateToken(newUser.email, newUser.id);

            return {...newUser , token}  
        } catch (error)
        {
            throw new InternalServerErrorException(error);
        }
        

    }
    
    async validateUser(data: LoginUserDto)
    {
        const user = await this.userService.findByEmail(data.email)
        if (!user)
        {
            throw new NotFoundException("User not Found")
        }
        const truePassword = await user.comparePassword(data.password)
        if (!truePassword)
        {
            throw new UnauthorizedException("Invalid Credentials")
        }

        const token = this.generateToken(user.email, user.id);

        return {...user , token}  
        // const response = new UserDto

        // response.email = user.email
        // response.token = token
        // console.log(response)
        // console.log(user, token)
        return token
    }

    async login(data: LoginUserDto) {
        const payload = { email: data.email, pass: data.password};
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    private generateToken(email: string, id: string) 
    {
    const token = this.jwtService.sign({email, id});
 
    return { access_token: token};
    }
}
