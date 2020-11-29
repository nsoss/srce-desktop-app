import { Entity, OneToMany } from 'typeorm';
import EntryEntity from './EntryEntity';
import EnumEntity from './EnumEntity';

@Entity('SuicideFactors')
export default class SuicideFactorEntity extends EnumEntity<SuicideFactor> {
  @OneToMany((type) => EntryEntity, (entry) => entry.suicideFactor)
  entries: Array<EntryEntity>;
}
