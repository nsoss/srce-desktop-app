import { Entity, OneToMany } from 'typeorm';
import EntryEntity from './EntryEntity';
import EnumEntity from './EnumEntity';

@Entity('MaritalStatuses')
export default class MaritalStatusEntity extends EnumEntity<MaritalStatus> {
  @OneToMany((type) => EntryEntity, (entry) => entry.maritalStatus)
  entries: Array<EntryEntity>;
}
