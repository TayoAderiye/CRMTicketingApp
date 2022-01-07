import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';
import { classToPlain } from "class-transformer";
import { Ticket } from "./ticket.entity";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Ticket, (ticket) => ticket.user)
    tickets: Ticket[];


    @BeforeInsert()
    async modifyColumns() {
    this.email = this.email.toLowerCase();

    const encrpted = await bcrypt.hash(this.password, 10);

    this.password = encrpted;
    }

    async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
    }
  
    toJSON() {
        return classToPlain(this);
      }
}