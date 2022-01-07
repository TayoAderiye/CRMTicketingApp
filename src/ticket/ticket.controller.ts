import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/models/user.entity';
import { Serialize } from 'src/serializer/serializer.interceptor';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { ResolveTicketDto } from './dtos/resolve-ticket.dto';
import { TicketDto } from './dtos/ticket.dto';
import { TicketService } from './ticket.service';

@ApiTags('Ticket')
@ApiBearerAuth('JWT')
@Controller('api/ticket')
export class TicketController {

    constructor(private ticketService: TicketService,){}

    @Get('getTicket')
    @UseGuards(JwtAuthGuard)
    getAll()
    {
        return this.ticketService.findAll()
    }

    @Get('getTicketById/:id')
    @UseGuards(JwtAuthGuard)
    getById(@Param('id') id: string)
    {
        return this.ticketService.findOne(id)
    }

    // @Get('getTicketByCustomerEmail')
    // @UseGuards(JwtAuthGuard)
    // getByEmail(@Query() email: TicketDto)
    // {
    //     return this.ticketService.findByEmail(email)
    // }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Serialize(TicketDto)
    createReport(@Body() body: CreateTicketDto, @CurrentUser() user: User)
    {
        return this.ticketService.create(body, user)
    }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard)
    approveReport(@Param('id') id: string, @Body() body: ResolveTicketDto)
    {
        return this.ticketService.resolveTicket(id, body.resolved)
    }
}
