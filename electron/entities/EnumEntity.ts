import { BaseEntity, Column, PrimaryColumn } from 'typeorm';

export default class EnumEntity<TEnum> extends BaseEntity {
  @PrimaryColumn('integer')
  id: number;

  @Column('text')
  value: TEnum;
}
