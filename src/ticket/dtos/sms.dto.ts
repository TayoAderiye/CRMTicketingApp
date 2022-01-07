import {IsEmail, IsString} from 'class-validator'

export class sendSmsDto {
    @IsEmail()
    body: string;

    @IsString()
    to: string
}
