import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean } from "class-validator"

export class ResolveTicketDto {
    @ApiProperty({ required: true})
    @IsBoolean()
    resolved: boolean
}