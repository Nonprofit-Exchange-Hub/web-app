import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1683855028140 implements MigrationInterface {
  name = 'Migrations1683855028140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."assets_type_enum" AS ENUM('donation', 'request')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."assets_condition_enum" AS ENUM('Like new', 'Excellent', 'Good', '')`,
    );
    await queryRunner.query(
      `CREATE TABLE "assets" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "type" "public"."assets_type_enum" NOT NULL DEFAULT 'request', "condition" "public"."assets_condition_enum" NOT NULL DEFAULT '', "searchtitle" tsvector GENERATED ALWAYS AS (to_tsvector('english', title)) STORED NOT NULL, "location" text, "datePosted" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "imgUrls" text, "posterId" integer, CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" SERIAL NOT NULL, "text" text NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, "transactionId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_status_enum" AS ENUM('NEW_CLAIM', 'IN_PROGRESS', 'FULFILLED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "status" "public"."transactions_status_enum" NOT NULL DEFAULT 'NEW_CLAIM', "created_date" TIMESTAMP NOT NULL DEFAULT now(), "donaterUserId" integer, "donaterOrganizationId" integer, "assetId" integer, "claimerId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" SERIAL NOT NULL, "name" text NOT NULL, "doing_business_as" text NOT NULL, "description" text NOT NULL, "website" text NOT NULL, "facebook" text, "twitter" text, "instagram" text, "address" text NOT NULL, "phone" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "zip_code" text, "ein" text NOT NULL, "nonprofit_classification" text NOT NULL, "image_url" text, "categories" jsonb, CONSTRAINT "UQ_59347062026e4a8d1448fb9ef5d" UNIQUE ("ein"), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_organizations_approvalstatus_enum" AS ENUM('APPROVED', 'PENDING', 'DENIED')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_organizations_role_enum" AS ENUM('ADMIN', 'OWNER', 'REVOKED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_organizations" ("id" SERIAL NOT NULL, "approvalStatus" "public"."user_organizations_approvalstatus_enum" NOT NULL DEFAULT 'PENDING', "role" "public"."user_organizations_role_enum" NOT NULL DEFAULT 'ADMIN', "created_date" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" integer, "userId" integer, CONSTRAINT "PK_51ed3f60fdf013ee5041d2d4d3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, "last_name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "bio" text, "city" text, "state" text, "zip_code" text, "email_notification_opt_out" boolean NOT NULL DEFAULT false, "email_verified" boolean NOT NULL DEFAULT false, "profile_image_url" text, "interests" jsonb, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "poc_chat" ("id" SERIAL NOT NULL, "text" text NOT NULL, "name" text NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_6bef3650cec8dcf6810d7b10943" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" text NOT NULL, "applies_to_assets" boolean NOT NULL, "applies_to_organizations" boolean NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8b0be371d28245da6e4f4b6187" ON "categories" ("name") `,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_b5a1aaea1ef536fbde3ca9bc16f" FOREIGN KEY ("posterId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" ADD CONSTRAINT "FK_3c6715302efcd7baba71fc8c038" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_b4c9607f708e522ca00bc5b9314" FOREIGN KEY ("donaterUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_96e5cde31c08b7a9a61e34715d2" FOREIGN KEY ("donaterOrganizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_7a6e7bd44674390f67b643408b6" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_f1d291653531d3b0ce996e78ab9" FOREIGN KEY ("claimerId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_organizations" ADD CONSTRAINT "FK_71997faba4726730e91d514138e" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_organizations" ADD CONSTRAINT "FK_11d4cd5202bd8914464f4bec379" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_organizations" DROP CONSTRAINT "FK_11d4cd5202bd8914464f4bec379"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_organizations" DROP CONSTRAINT "FK_71997faba4726730e91d514138e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_f1d291653531d3b0ce996e78ab9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_7a6e7bd44674390f67b643408b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_96e5cde31c08b7a9a61e34715d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_b4c9607f708e522ca00bc5b9314"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_3c6715302efcd7baba71fc8c038"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`,
    );
    await queryRunner.query(
      `ALTER TABLE "assets" DROP CONSTRAINT "FK_b5a1aaea1ef536fbde3ca9bc16f"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_8b0be371d28245da6e4f4b6187"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "poc_chat"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_organizations"`);
    await queryRunner.query(`DROP TYPE "public"."user_organizations_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_organizations_approvalstatus_enum"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_status_enum"`);
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "assets"`);
    await queryRunner.query(`DROP TYPE "public"."assets_condition_enum"`);
    await queryRunner.query(`DROP TYPE "public"."assets_type_enum"`);
  }
}
