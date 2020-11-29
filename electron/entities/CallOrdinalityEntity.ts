import { Entity, OneToMany } from 'typeorm';
import EntryEntity from './EntryEntity';
import EnumEntity from './EnumEntity';

@Entity('CallOrdinalities')
export default class CallOrdinalityEntity extends EnumEntity<CallOrdinality> {
  @OneToMany((type) => EntryEntity, (entry) => entry.callOrdinality)
  entries: Array<EntryEntity>;
}
