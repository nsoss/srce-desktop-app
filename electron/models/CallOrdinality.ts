import { Column, Entity, OneToMany } from 'typeorm';
import Call from './Call';
import CallField from './CallField';

@Entity('CallTypes')
export default class CallType extends CallField {
    @Column('varchar')
    value: string;
    @OneToMany(
        type => Call,
        call => call.callOrdinality
    )
    calls: Array<Call>;
}
