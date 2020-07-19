import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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

  @ManyToOne((type) => Volunteer, (volunteer) => volunteer.calls)
  @JoinColumn({ name: 'volunteer_id' })
  volunteer: Volunteer;

  @ManyToOne((type) => CallOrdinality, (callOrdinality) => callOrdinality.calls)
  @JoinColumn({ name: 'call_ordinality_id' })
  callOrdinality: CallOrdinality;

  @ManyToOne((type) => CallType, (callType) => callType.calls)
  @JoinColumn({ name: 'call_type_id' })
  callType: CallType;

  @ManyToOne((type) => Gender, (gender) => gender.calls)
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @ManyToOne((type) => MaritalStatus, (maritalStatus) => maritalStatus.calls)
  @JoinColumn({ name: 'marital_status_id' })
  maritalStatus: MaritalStatus;

  @ManyToOne((type) => PostCallState, (postCallState) => postCallState.calls)
  @JoinColumn({ name: 'post_call_state_id' })
  postCallState: PostCallState;

  @ManyToOne((type) => ProblemType, (problemType) => problemType.calls)
  @JoinColumn({ name: 'problem_type_id' })
  problemType: ProblemType;

  @ManyToOne((type) => SuicideFactor, (suicideFactor) => suicideFactor.calls)
  @JoinColumn({ name: 'suicide_factor_id' })
  suicideFactor: SuicideFactor;

  @ManyToOne((type) => SuicideRisk, (suicideRisk) => suicideRisk.calls)
  @JoinColumn({ name: 'suicide_risk_id' })
  suicideRisk: SuicideRisk;
}
