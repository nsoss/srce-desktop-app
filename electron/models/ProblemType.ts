import { Entity } from 'typeorm';
import CallField from './CallField';

@Entity('ProblemTypes')
export default class ProblemType extends CallField {}
