import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserTable1631016124617 implements MigrationInterface {
    name = 'createUserTable1631016124617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `pichat`.`user` (`id` char(36) NOT NULL, `nickname` varchar(50) NOT NULL, `isOnline` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX `IDX_e2364281027b926b879fa2fa1e` (`nickname`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_e2364281027b926b879fa2fa1e` ON `pichat`.`user`");
        await queryRunner.query("DROP TABLE `pichat`.`user`");
    }

}
