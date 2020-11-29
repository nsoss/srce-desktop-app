import { Entity, OneToMany } from 'typeorm';
import EntryEntity from './EntryEntity';
import EnumEntity from './EnumEntity';

@Entity('CallTypes')
export default class CallTypeEntity extends EnumEntity<CallType> {
  @OneToMany((type) => EntryEntity, (entry) => entry.callType)
  entries: Array<EntryEntity>;
}
