import { Expose, Transform } from "class-transformer";



export class TicketDto {

    @Expose()
    id: string

    @Expose()
    customer_email: string

    @Expose()
    customer_address: string

    @Expose()
    customer_name: string

    @Expose()
    customer_number: string

    @Expose()
    customer_complain: string

    @Expose()
    resolved: boolean

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: string
}
