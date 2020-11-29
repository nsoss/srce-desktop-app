import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntry1606658928872 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

    CREATE TABLE CallTypes (
      id INTEGER PRIMARY KEY,
      value TEXT NOT NULL
    )

    `);
    await queryRunner.query(`

    INSERT INTO CallTypes (value)
    VALUES
      ('SILENT'),
      ('INFORMATIONAL'),
      ('CHRONIC'),
      ('SUPPORT')

    `);
    await queryRunner.query(`

    CREATE TABLE Genders (
      id INTEGER PRIMARY KEY,
      value TEXT NOT NULL
    )

    `);
    await queryRunner.query(`

    INSERT INTO Genders (value)
    VALUES
      ('MALE'),
      ('FEMALE')

    `);
    await queryRunner.query(`

    CREATE TABLE MaritalStatuses (
      id INTEGER PRIMARY KEY,
      value TEXT NOT NULL
    )

    `);
    await queryRunner.query(`

    INSERT INTO MaritalStatuses (value)
    VALUES
      ('SINGLE'),
      ('MARRIED'),
      ('DIVORCED'),
      ('WIDOWED'),
      ('COHABITATED')

    `);
    await queryRunner.query(`

    CREATE TABLE CallOrdinalities (
      id INTEGER PRIMARY KEY,
      value TEXT NOT NULL
    )

    `);
    await queryRunner.query(`

    INSERT INTO CallOrdinalities (value)
    VALUES
      ('FIRST'),
      ('SUBSEQUENT')

    `);
    await queryRunner.query(`

    CREATE TABLE ProblemTypes (
      id INTEGER PRIMARY KEY,
      value TEXT NOT NULL
    )

    `);
    await queryRunner.query(`

    INSERT INTO ProblemTypes (value)
    VALUES
      ('LOSS'),
      ('LONELINESS'),
      ('PARTNER'),
      ('FAMILY'),
      ('SCHOOL_OR_WORK'),
      ('EXISTENTIAL'),
      ('ALCOHOL_ADDICTION'),
      ('DRUG_ADDICTION'),
      ('MENTAL_DISORDER'),
      ('SEXUAL_DISORDER'),
      ('SEXUAL_ORIENTATION_ISSUE'),
      ('PHYSICAL_ILLNESS'),
      ('DISABILITY'),
      ('ABUSE'),
      ('CALL_FOR_A_THIRD_PARTY'),
      ('MANIPULATIVE'),
      ('OTHER')

    `);
    await queryRunner.query(`

    CREATE TABLE SuicideRisks (
      id INTEGER PRIMARY KEY,
      value TEXT NOT NULL
    )

    `);
    await queryRunner.query(`

    INSERT INTO SuicideRisks (value)
    VALUES
      ('UNDETERMINED'),
      ('NONE'),
      ('THOUGHT'),
      ('PLAN'),
      ('IMMEDIATE')

    `);
    await queryRunner.query(`

    CREATE TABLE SuicideFactors (
      id INTEGER PRIMARY KEY,
      value TEXT NOT NULL
    )

    `);
    await queryRunner.query(`

    INSERT INTO SuicideFactors (value)
    VALUES
      ('MENTAL_DISORDER'),
      ('ADDICTION'),
      ('CRISIS'),
      ('PHYSICAL_ILLNESS'),
      ('TRAUMA_OR_ABUSE'),
      ('EARLIER_ATTEMPTS'),
      ('SUICIDE_OF_FAMILY_MEMBER')

    `);
    await queryRunner.query(`

    CREATE TABLE PostCallStates (
      id INTEGER PRIMARY KEY,
      value TEXT NOT NULL
    )

    `);
    await queryRunner.query(`

    INSERT INTO PostCallStates (value)
    VALUES
      ('UNDETERMINED'),
      ('UNCHANGED'),
      ('BETTER'),
      ('WORSE')

    `);
    await queryRunner.query(`

    CREATE TABLE Entries (
      id INTEGER PRIMARY KEY,

      date INTEGER NOT NULL,
      time INTEGER NOT NULL,
      duration INTEGER,
      caller TEXT,
      description TEXT,
      note TEXT,

      created_at INTEGER NOT NULL,
      updated_at INTEGER,

      volunteer_id INTEGER NOT NULL,
      call_type_id INTEGER NOT NULL,
      gender_id INTEGER,
      marital_status_id INTEGER,
      call_ordinality_id INTEGER,
      problem_type_id INTEGER NOT NULL,
      suicide_risk_id INTEGER NOT NULL,
      suicide_factor_id INTEGER NOT NULL,
      post_call_state_id INTEGER NOT NULL,

      FOREIGN KEY (volunteer_id) REFERENCES Volunteers (id),
      FOREIGN KEY (call_type_id) REFERENCES CallTypes (id),
      FOREIGN KEY (gender_id) REFERENCES Genders (id),
      FOREIGN KEY (marital_status_id) REFERENCES MaritalStatuses (id),
      FOREIGN KEY (call_ordinality_id) REFERENCES CallOrdinalities (id),
      FOREIGN KEY (problem_type_id) REFERENCES ProblemTypes (id),
      FOREIGN KEY (suicide_risk_id) REFERENCES SuicideRisks (id),
      FOREIGN KEY (suicide_factor_id) REFERENCES SuicideFactors (id),
      FOREIGN KEY (post_call_state_id) REFERENCES PostCallStates (id)
    )

    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Entries');
    await queryRunner.dropTable('PostCallStates');
    await queryRunner.dropTable('SuicideFactors');
    await queryRunner.dropTable('SuicideRisks');
    await queryRunner.dropTable('ProblemTypes');
    await queryRunner.dropTable('CallOrdinalities');
    await queryRunner.dropTable('MaritalStatuses');
    await queryRunner.dropTable('Genders');
    await queryRunner.dropTable('CallTypes');
  }
}
