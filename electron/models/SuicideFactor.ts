import { Entity, OneToMany } from 'typeorm';
import Call from './Call';
import CallField from './CallField';

@Entity('SuicideFactors')
export default class SuicideFactor extends CallField {
    @OneToMany(
        type => Call,
        call => call.suicideFactor
    )
    calls: Array<Call>;
}
