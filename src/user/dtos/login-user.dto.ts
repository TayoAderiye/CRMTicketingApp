import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator'

export class LoginUserDto {
    @ApiProperty({ required: true, example: 'test@test.com'})
    @IsEmail()
    email: string;

    @ApiProperty({ required: true})
    @IsString()
    password: string
}