import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export default class CallField extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  value: string;
}
