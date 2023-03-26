import { MigrationInterface, QueryRunner } from "typeorm";

export class createOpeningsTable1679853090339 implements MigrationInterface {
    name = 'createOpeningsTable1679853090339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "openings" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "youtubeUrl" character varying NOT NULL, "keywords" text array NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "PK_52465524569a0b0e856a64eb48b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "openings"`);
    }

}
