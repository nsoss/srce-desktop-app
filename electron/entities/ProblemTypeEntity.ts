import { Entity, OneToMany } from 'typeorm';
import EntryEntity from './EntryEntity';
import EnumEntity from './EnumEntity';

@Entity('ProblemTypes')
export default class ProblemTypeEntity extends EnumEntity<ProblemType> {
  @OneToMany((type) => EntryEntity, (entry) => entry.problemType)
  entries: Array<EntryEntity>;
}
