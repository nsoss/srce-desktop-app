import { Entity } from 'typeorm';
import CallField from './CallField';

@Entity('MaritalStatuses')
export default class MaritalStatus extends CallField {}
