import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import CallOrdinality from './CallOrdinality';
import CallType from './CallType';
import Gender from './Gender';
import MaritalStatus from './MaritalStatus';
import PostCallState from './PostCallState';
import ProblemType from './ProblemType';
import SuicideFactor from './SuicideFactor';
import SuicideRisk from './SuicideRisk';
import Volunteer from './Volunteer';

@Entity('Calls')
export default class Call extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => CallType,
        callType => callType.calls
    )
    callType: CallType;

    @ManyToOne(
        type => ProblemType,
        callType => callType.calls
    )
    problemType: ProblemType;

    @ManyToOne(
        type => SuicideRisk,
        callType => callType.calls
    )
    suicideRisk: SuicideRisk;

    @ManyToOne(
        type => SuicideFactor,
        callType => callType.calls
    )
    suicideFactor: SuicideFactor;

    @ManyToOne(
        type => PostCallState,
        callType => callType.calls
    )
    postCallState: PostCallState;

    @ManyToOne(
        type => Gender,
        callType => callType.calls
    )
    gender: Gender;

    @ManyToOne(
        type => MaritalStatus,
        callType => callType.calls
    )
    maritalStatus: MaritalStatus;

    @ManyToOne(
        type => CallOrdinality,
        callType => callType.calls
    )
    callOrdinality: CallOrdinality;

    @ManyToOne(
        type => Volunteer,
        volunteer => volunteer.calls
    )
    volunteer: Volunteer;
}
