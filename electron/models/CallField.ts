import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Call from './Call';

export default class CallField extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @OneToMany(
        type => Call,
        call => call.callType
    )
    calls: Array<Call>;
}
