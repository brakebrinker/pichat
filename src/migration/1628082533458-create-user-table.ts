import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserTable1628082533458 implements MigrationInterface {
    name = 'createUserTable1628082533458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `pichat`.`user` (`id` char(36) NOT NULL, `nickname` varchar(50) NOT NULL, `isOnline` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `pichat`.`user`");
    }

}
