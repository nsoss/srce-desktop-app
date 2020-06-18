import { Entity } from 'typeorm';
import CallField from './CallField';

@Entity('SuicideRisks')
export default class SuicideRisk extends CallField {}
