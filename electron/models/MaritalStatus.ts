import { Entity, OneToMany } from 'typeorm';
import Call from './Call';
import CallField from './CallField';

@Entity('MaritalStatuses')
export default class MaritalStatus extends CallField {
  @OneToMany((type) => Call, (call) => call.maritalStatus)
  calls: Array<Call>;
}
