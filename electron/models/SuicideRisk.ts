import { Entity, OneToMany } from 'typeorm';
import Call from './Call';
import CallField from './CallField';

@Entity('SuicideRisks')
export default class SuicideRisk extends CallField {
  @OneToMany((type) => Call, (call) => call.suicideRisk)
  calls: Array<Call>;
}
