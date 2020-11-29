import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVolunteer1606658907521 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

    CREATE TABLE Volunteers (
      id INTEGER PRIMARY KEY,

      name TEXT NOT NULL,

      created_at INTEGER NOT NULL,
      updated_at INTEGER
    )

    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Volunteers');
  }
}
