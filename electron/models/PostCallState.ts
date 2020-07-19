import { Entity, OneToMany } from 'typeorm';
import Call from './Call';
import CallField from './CallField';

@Entity('PostCallStates')
export default class PostCallState extends CallField {
  @OneToMany((type) => Call, (call) => call.postCallState)
  calls: Array<Call>;
}
