import { Entity } from 'typeorm';
import CallField from './CallField';

@Entity('PostCallStates')
export default class PostCallState extends CallField {}
