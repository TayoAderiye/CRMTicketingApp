import { Expose } from 'class-transformer';
import {IsEmail, IsString} from 'class-validator'

export class UserDto {
    @Expose()
    id: string

    @Expose()
    email: string;

    @Expose()
    token: Object
}