import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class SmsService {

    constructor(
    @InjectTwilio() private client: TwilioClient,
    private config: ConfigService){}

    async sendSMS(sms: any)
    {
        await this.twolio(sms.body, sms.to)

    }   
    


    public twolio (body: string, to: string)
    {   
        // console.log('body', body)
        // console.log('to', to)
        // console.log(this.config.get('TWILIO_PHONE_NUMBER'))
        this.client.messages.create({
            body,
            from: this.config.get('TWILIO_PHONE_NUMBER'),
            to
        })

    }

    
}
