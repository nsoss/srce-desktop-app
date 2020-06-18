import { Entity } from 'typeorm';
import CallField from './CallField';

@Entity('CallTypes')
export default class CallType extends CallField {}
