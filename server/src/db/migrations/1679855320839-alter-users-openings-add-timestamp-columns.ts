import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUsersOpeningsAddTimestampColumns1679855320839 implements MigrationInterface {
    name = 'alterUsersOpeningsAddTimestampColumns1679855320839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "openings" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "openings" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "openings" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "openings" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "openings" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "openings" DROP COLUMN "created_at"`);
    }

}
