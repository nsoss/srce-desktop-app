import { Entity, OneToMany } from 'typeorm';
import Call from './Call';
import CallField from './CallField';

@Entity('CallTypes')
export default class CallType extends CallField {
    @OneToMany(
        type => Call,
        call => call.callType
    )
    calls: Array<Call>;
}
