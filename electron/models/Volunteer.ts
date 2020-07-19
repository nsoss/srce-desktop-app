import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Call from './Call';

@Entity('Volunteers')
export default class Volunteer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('bigint', { name: 'created_at' })
  createdAt: Date;

  @OneToMany((type) => Call, (call) => call.volunteer)
  calls: Array<Call>;
}
