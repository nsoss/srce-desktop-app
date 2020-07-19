import { Entity, OneToMany } from 'typeorm';
import Call from './Call';
import CallField from './CallField';

@Entity('ProblemTypes')
export default class ProblemType extends CallField {
    @OneToMany(
        type => Call,
        call => call.problemType
    )
    calls: Array<Call>;
}
