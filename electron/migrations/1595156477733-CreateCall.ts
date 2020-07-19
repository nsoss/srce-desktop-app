import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateCall1595156477733 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Calls',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'created_at',
                        type: 'bigint',
                    },
                    {
                        name: 'volunteer_id',
                        type: 'integer',
                    },
                ],
            })
        );
        await queryRunner.createForeignKey(
            'Calls',
            new TableForeignKey({
                columnNames: ['volunteer_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'Volunteers',
            })
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Calls');
    }
}
