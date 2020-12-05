import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import EntryEntity from './EntryEntity';

@Entity('Volunteers')
export default class VolunteerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('integer', { name: 'created_at' })
  createdAt: Date;

  @Column('integer', { name: 'updated_at' })
  updatedAt?: Date;

  @OneToMany((type) => EntryEntity, (entry) => entry.volunteer)
  entries: Array<EntryEntity>;
}
