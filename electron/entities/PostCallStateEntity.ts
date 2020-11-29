import { Entity, OneToMany } from 'typeorm';
import EntryEntity from './EntryEntity';
import EnumEntity from './EnumEntity';

@Entity('PostCallStates')
export default class PostCallStateEntity extends EnumEntity<PostCallState> {
  @OneToMany((type) => EntryEntity, (entry) => entry.postCallState)
  entries: Array<EntryEntity>;
}
