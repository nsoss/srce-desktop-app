import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const callOrdinalities = ['FIRST', 'NOT_FIRST'];

const callTypes = ['SILENT', 'INFORMATIONAL', 'CHRONIC', 'SUPPORT'];

const genders = ['MALE', 'FEMALE'];

const maritalStatuses = [
  'MARRIED',
  'DIVORCED',
  'WINDOWED',
  'COHABITATED',
  'SINGLE',
  'UNDETERMINED',
];

const postCallStates = ['BETTER', 'UNCHANGED', 'WORSE', 'UNDETERMINED'];

const problemTypes = [
  'LOSS',
  'LONELINESS',
  'PARTNER',
  'FAMILY',
  'SCHOOL_OR_WORK',
  'EXISTENTIAL',
  'ADDICTION_ALCOHOLISM',
  'ADDICTION_NARCOMANIAL',
  'MENTAL_DISORDER',
  'SEXUAL_DISORDER',
  'SEXUAL_ORIENTATION_DISORDER',
  'PHYSICAL_ILLNESS',
  'DISABILITY',
  'ABUSE',
  'CALL_FOR_A_THIRD_PARTY',
  'MANIPULATIVE',
  'OTHER',
];

const suicideFactors = [
  'MENTAL_DISORDER',
  'ADDICTION',
  'CRISIS',
  'PHYSICAL_ILLNESS',
  'TRAUMA_OR_ABUSE',
  'EARLIER_ATTEMPTS',
  'SUICIDE_OF_FAMILY_MEMBER',
];

const suicideRisks = ['UNDETERMINED', 'NONE', 'THOUGHT', 'PLAN', 'IMMEDIATE'];

export default class AddCallDataToCall1595157453390
  implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('Calls', [
      new TableColumn({
        name: 'call_ordinality_id',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'call_type_id',
        type: 'integer',
      }),
      new TableColumn({
        name: 'gender_id',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'marital_status_id',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'post_call_state_id',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'problem_type_id',
        type: 'integer',
      }),
      new TableColumn({
        name: 'suicide_factor_id',
        type: 'integer',
      }),
      new TableColumn({
        name: 'suicide_risk_id',
        type: 'integer',
      }),
    ]);
    await this.createCallDataTable(
      queryRunner,
      'CallOrdinalities',
      'call_ordinality_id',
      callOrdinalities
    );
    await this.createCallDataTable(
      queryRunner,
      'CallTypes',
      'call_type_id',
      callTypes
    );
    await this.createCallDataTable(
      queryRunner,
      'Genders',
      'gender_id',
      genders
    );
    await this.createCallDataTable(
      queryRunner,
      'MaritalStatuses',
      'marital_status_id',
      maritalStatuses
    );
    await this.createCallDataTable(
      queryRunner,
      'PostCallStates',
      'post_call_state_id',
      postCallStates
    );
    await this.createCallDataTable(
      queryRunner,
      'ProblemTypes',
      'problem_type_id',
      problemTypes
    );
    await this.createCallDataTable(
      queryRunner,
      'SuicideFactors',
      'suicide_factor_id',
      suicideFactors
    );
    await this.createCallDataTable(
      queryRunner,
      'SuicideRisks',
      'suicide_risk_id',
      suicideRisks
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Calls', 'call_ordinality_id');
    await queryRunner.dropColumn('Calls', 'call_type_id');
    await queryRunner.dropColumn('Calls', 'gender_id');
    await queryRunner.dropColumn('Calls', 'marital_status_id');
    await queryRunner.dropColumn('Calls', 'post_call_state_id');
    await queryRunner.dropColumn('Calls', 'problem_type_id');
    await queryRunner.dropColumn('Calls', 'suicide_factor_id');
    await queryRunner.dropColumn('Calls', 'suicide_risk_id');
    await queryRunner.dropTable('CallOrdinalities');
    await queryRunner.dropTable('CallTypes');
    await queryRunner.dropTable('Genders');
    await queryRunner.dropTable('MaritalStatuses');
    await queryRunner.dropTable('PostCallStates');
    await queryRunner.dropTable('ProblemTypes');
    await queryRunner.dropTable('SuicideFactors');
    await queryRunner.dropTable('SuicideRisks');
  }

  async createCallDataTable(
    queryRunner: QueryRunner,
    tableName: string,
    foreignKeyName: string,
    data: Array<string>
  ): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'value',
            type: 'varchar',
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      'Calls',
      new TableForeignKey({
        columnNames: [foreignKeyName],
        referencedColumnNames: ['id'],
        referencedTableName: tableName,
      })
    );
    data.forEach(async (value, index) => {
      const query = `INSERT INTO ${tableName} (id, value) VALUES (${
        index + 1
      }, '${value}')`;
      await queryRunner.query(query);
    });
  }
}
