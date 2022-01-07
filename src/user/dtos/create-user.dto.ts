import {IsEmail, IsString} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ required: true, example: 'test@test.com'})
    @IsEmail()
    email: string;

    @ApiProperty({ required: true})
    @IsString()
    password: string
}