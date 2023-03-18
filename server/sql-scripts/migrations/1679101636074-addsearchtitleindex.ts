import { MigrationInterface, QueryRunner } from "typeorm"

export class addsearchtitleindex1679101636074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`CREATE INDEX "searchtitleindex" ON "assets" USING GIN("searchtitle")`)
            
        }
    
        async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(
                `drop index "searchtitleindex"`,
            ) // reverts things made in "up" method
        }
    }
