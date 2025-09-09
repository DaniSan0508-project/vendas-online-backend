import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateTableAddress1757382725919 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'address',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'city_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'number',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'address',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'address',
            new TableForeignKey({
                columnNames: ['city_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'city',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('address');
        if (table) {
            const foreignKeyUser = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf('user_id') !== -1,
            );
            const foreignKeyCity = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf('city_id') !== -1,
            );

            if (foreignKeyUser) {
                await queryRunner.dropForeignKey('address', foreignKeyUser);
            }
            if (foreignKeyCity) {
                await queryRunner.dropForeignKey('address', foreignKeyCity);
            }
        }

        await queryRunner.dropTable('address');
    }
}