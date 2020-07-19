import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
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

    @Column('bigint', { name: 'created_at' })
    createdAt: Date;

    @ManyToOne(
        type => Volunteer,
        volunteer => volunteer.calls
    )
    volunteer: Volunteer;

    @ManyToOne(
        type => CallOrdinality,
        callOrdinality => callOrdinality.calls
    )
    callOrdinality: CallOrdinality;

    @ManyToOne(
        type => CallType,
        callType => callType.calls
    )
    callType: CallType;

    @ManyToOne(
        type => Gender,
        gender => gender.calls
    )
    gender: Gender;

    @ManyToOne(
        type => MaritalStatus,
        maritalStatus => maritalStatus.calls
    )
    maritalStatus: MaritalStatus;

    @ManyToOne(
        type => PostCallState,
        postCallState => postCallState.calls
    )
    postCallState: PostCallState;

    @ManyToOne(
        type => ProblemType,
        problemType => problemType.calls
    )
    problemType: ProblemType;

    @ManyToOne(
        type => SuicideFactor,
        suicideFactor => suicideFactor.calls
    )
    suicideFactor: SuicideFactor;

    @ManyToOne(
        type => SuicideRisk,
        suicideRisk => suicideRisk.calls
    )
    suicideRisk: SuicideRisk;
}
