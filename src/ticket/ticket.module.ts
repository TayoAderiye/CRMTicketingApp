import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwilioModule } from 'nestjs-twilio';
import { Ticket } from 'src/models/ticket.entity';
import { SmsService } from 'src/twilioo/sms.service';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    TwilioModule
  
  ],
  controllers: [TicketController],
  providers: [TicketService, SmsService]
})
export class TicketModule {}
