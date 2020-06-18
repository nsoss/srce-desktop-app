import { Entity } from 'typeorm';
import CallField from './CallField';

@Entity('Genders')
export default class Gender extends CallField {}
