import { Entity, OneToMany } from 'typeorm';
import EntryEntity from './EntryEntity';
import EnumEntity from './EnumEntity';

@Entity('SuicideRisks')
export default class SuicideRiskEntity extends EnumEntity<SuicideRisk> {
  @OneToMany((type) => EntryEntity, (entry) => entry.suicideRisk)
  entries: Array<EntryEntity>;
}
