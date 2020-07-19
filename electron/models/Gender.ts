import { Entity, OneToMany } from 'typeorm';
import Call from './Call';
import CallField from './CallField';

@Entity('Genders')
export default class Gender extends CallField {
    @OneToMany(
        type => Call,
        call => call.gender
    )
    calls: Array<Call>;
}
