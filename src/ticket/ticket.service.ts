import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { Ticket } from 'src/models/ticket.entity';
import { User } from 'src/models/user.entity';
import { SmsService } from 'src/twilioo/sms.service';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { sendSmsDto } from './dtos/sms.dto';
import { TicketDto } from './dtos/ticket.dto';

@Injectable()
export class TicketService {

    constructor(@InjectRepository(Ticket) private _repo: Repository<Ticket>,
                private smsService: SmsService,
                private config: ConfigService){}

    create(ticketDto: CreateTicketDto, user: User)
    {

        const ticket =  this._repo.create(ticketDto)

        this.smsService.twolio(`${ticketDto.customer_complain} with number #${this.randomNumber()} has been logged`,ticketDto.customer_number)


        ticket.user = user

        


        return this._repo.save(ticket)
    }

    async resolveTicket (id: string, resolved: boolean)
    {
        const ticket = await this._repo.findOne(id);
        if (!ticket)
        {
            throw new NotFoundException('Ticket not Found')
        }

        ticket.resolved = resolved
        this.smsService.twolio(`${ticket.customer_complain} with number #${this.randomNumber()} has been resolved`,ticket.customer_number)

        return this._repo.save(ticket)
    }


    public async findOne(id: string)
    {
        return this._repo.findOne(id)
    }

    // public async findByEmail(email: TicketDto)
    // {
    //     return this._repo.find({where: email.customer_email})
    // }

    public async findAll()
    {
        return this._repo.find()
    }


    private randomNumber()
    {
        const rand = Math.floor(Math.random() * 9000000000) + 100000000000;
        return rand
    }
    


  

}
