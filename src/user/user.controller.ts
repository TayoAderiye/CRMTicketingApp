import { Body, Controller,Request, Get, NotFoundException, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Controller('api/users')
export class UserController {

    constructor(private userService: UserService){}

    @Get('getUsers')
    @UseGuards(JwtAuthGuard)
    async getUsers()
    {
        const users = await this.userService.findAll()
        return users
    }

    @Get('getUserById/:id')
    @UseGuards(JwtAuthGuard)
    async getUserById(@Param('id', ParseUUIDPipe) id: string)
    {
        const user = await this.userService.findOne(id)
        if (!user)
        {
            throw new NotFoundException("User not Found")
        }
        return user
    }

    @Get('getUserByEmail/:email')
    @UseGuards(JwtAuthGuard)
    async getUserByEmail(@Param('email') email: string)
    {
        const user = await this.userService.findByEmail(email)
        if (!user)
        {
            throw new NotFoundException("User not Found")
        }
        return user
    }


}
