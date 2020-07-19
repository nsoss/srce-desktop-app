import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddBasicInfoToCall1595170680596
  implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('Calls', [
      new TableColumn({
        name: 'serial_number',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'datetime',
        type: 'bigint',
        isNullable: true,
      }),
      new TableColumn({
        name: 'duration_in_seconds',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'caller_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'summary',
        type: 'text',
        isNullable: true,
      }),
      new TableColumn({
        name: 'note',
        type: 'text',
        isNullable: true,
      }),
    ]);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Calls', 'serial_number');
    await queryRunner.dropColumn('Calls', 'date');
    await queryRunner.dropColumn('Calls', 'time');
    await queryRunner.dropColumn('Calls', 'duration_in_seconds');
    await queryRunner.dropColumn('Calls', 'caller_name');
    await queryRunner.dropColumn('Calls', 'summary');
    await queryRunner.dropColumn('Calls', 'note');
  }
}
