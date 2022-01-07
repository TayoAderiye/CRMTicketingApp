import { PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

}