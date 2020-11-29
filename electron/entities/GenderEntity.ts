import { Entity, OneToMany } from 'typeorm';
import EntryEntity from './EntryEntity';
import EnumEntity from './EnumEntity';

@Entity('Genders')
export default class GenderEntity extends EnumEntity<Gender> {
  @OneToMany((type) => EntryEntity, (entry) => entry.gender)
  entries: Array<EntryEntity>;
}
