import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import CallOrdinalityEntity from './CallOrdinalityEntity';
import CallTypeEntity from './CallTypeEntity';
import GenderEntity from './GenderEntity';
import MaritalStatusEntity from './MaritalStatusEntity';
import PostCallStateEntity from './PostCallStateEntity';
import ProblemTypeEntity from './ProblemTypeEntity';
import SuicideFactorEntity from './SuicideFactorEntity';
import SuicideRiskEntity from './SuicideRiskEntity';
import VolunteerEntity from './VolunteerEntity';

@Entity('Entries')
export default class EntryEntity extends BaseEntity {
  @PrimaryColumn('integer')
  id: number;

  @Column('integer')
  date: Date;

  @Column('integer')
  time: boolean;

  @Column('integer')
  duration?: number;

  @Column('text')
  caller?: string;

  @Column('text')
  description?: string;

  @Column('text')
  note?: string;

  @Column('integer', { name: 'created_at' })
  createdAt: Date;

  @Column('integer', { name: 'updated_at' })
  updatedAt?: Date;

  @ManyToOne((type) => VolunteerEntity, (volunteer) => volunteer.entries)
  @JoinColumn({ name: 'volunteer_id' })
  volunteer: Volunteer;

  @ManyToOne((type) => CallTypeEntity, (callType) => callType.entries)
  @JoinColumn({ name: 'call_type_id' })
  callType: CallType;

  @ManyToOne((type) => GenderEntity, (gender) => gender.entries)
  @JoinColumn({ name: 'gender_id' })
  gender?: Gender;

  @ManyToOne(
    (type) => MaritalStatusEntity,
    (maritalStatus) => maritalStatus.entries
  )
  @JoinColumn({ name: 'marital_status_id' })
  maritalStatus?: MaritalStatus;

  @ManyToOne(
    (type) => CallOrdinalityEntity,
    (callOrdinality) => callOrdinality.entries
  )
  @JoinColumn({ name: 'call_ordinality__id' })
  callOrdinality?: CallOrdinality;

  @ManyToOne((type) => ProblemTypeEntity, (problemType) => problemType.entries)
  @JoinColumn({ name: 'problem_type_id' })
  problemType: ProblemType;

  @ManyToOne((type) => SuicideRiskEntity, (suicideRisk) => suicideRisk.entries)
  @JoinColumn({ name: 'suicide_risk_id' })
  suicideRisk: SuicideRisk;

  @ManyToOne(
    (type) => SuicideFactorEntity,
    (suicideFactor) => suicideFactor.entries
  )
  @JoinColumn({ name: 'suicide_factor_id' })
  suicideFactor: SuicideFactor;

  @ManyToOne(
    (type) => PostCallStateEntity,
    (postCallState) => postCallState.entries
  )
  @JoinColumn({ name: 'post_call_state_id' })
  postCallState: PostCallState;
}
