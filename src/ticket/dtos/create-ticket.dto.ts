import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from "class-validator"

export class CreateTicketDto {
    @ApiProperty({ required: true, example: 'test@test.com'})
    @IsString()
    customer_email: string;

    @ApiProperty({ required: true })
    @IsString()
    customer_address: string;

    @ApiProperty({ required: true })
    @IsString()
    customer_name: string;

    @ApiProperty({ required: true, example: '+2348103456781'})
    @IsString()
    customer_number: string;

    @ApiProperty({ required: true})
    @IsString()
    customer_complain: string;

}




