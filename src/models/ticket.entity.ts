import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany, BeforeInsert, ManyToOne } from "typeorm";
import { User } from "./user.entity";



@Entity()
export class Ticket {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customer_email: string;

    @Column()
    customer_address: string;

    @Column()
    customer_name: string;

    @Column()
    customer_number: string;

    @Column()
    customer_complain: string;

    @Column({ default: false })
    resolved: boolean;

    @ManyToOne(() => User, (user) => user.tickets)
    user: User


    @BeforeInsert()
    async modifyColumns() {

    this.customer_email = this.customer_email.toLowerCase();

    this.customer_name = this.customer_name.toLowerCase();
    
    }

    

    
}