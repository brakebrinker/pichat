import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserAndRoomTables1631210183493 implements MigrationInterface {
    name = 'createUserAndRoomTables1631210183493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `pichat`.`user` (`id` char(36) NOT NULL, `nickname` varchar(50) NOT NULL, `isOnline` tinyint NOT NULL, UNIQUE INDEX `IDX_e2364281027b926b879fa2fa1e` (`nickname`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pichat`.`room` (`id` char(36) NOT NULL, `name` varchar(50) NOT NULL, `creatorId` char(36) NULL, UNIQUE INDEX `IDX_535c742a3606d2e3122f441b26` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pichat`.`user_rooms_room` (`userId` char(36) NOT NULL, `roomId` char(36) NOT NULL, INDEX `IDX_4031804b462cdb23799d73073c` (`userId`), INDEX `IDX_26f04118a1ad0bd2175fcf44e6` (`roomId`), PRIMARY KEY (`userId`, `roomId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `pichat`.`room` ADD CONSTRAINT `FK_86e40e0afb08286884be0e6f38b` FOREIGN KEY (`creatorId`) REFERENCES `pichat`.`user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `pichat`.`user_rooms_room` ADD CONSTRAINT `FK_4031804b462cdb23799d73073c6` FOREIGN KEY (`userId`) REFERENCES `pichat`.`user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `pichat`.`user_rooms_room` ADD CONSTRAINT `FK_26f04118a1ad0bd2175fcf44e60` FOREIGN KEY (`roomId`) REFERENCES `pichat`.`room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pichat`.`user_rooms_room` DROP FOREIGN KEY `FK_26f04118a1ad0bd2175fcf44e60`");
        await queryRunner.query("ALTER TABLE `pichat`.`user_rooms_room` DROP FOREIGN KEY `FK_4031804b462cdb23799d73073c6`");
        await queryRunner.query("ALTER TABLE `pichat`.`room` DROP FOREIGN KEY `FK_86e40e0afb08286884be0e6f38b`");
        await queryRunner.query("DROP INDEX `IDX_26f04118a1ad0bd2175fcf44e6` ON `pichat`.`user_rooms_room`");
        await queryRunner.query("DROP INDEX `IDX_4031804b462cdb23799d73073c` ON `pichat`.`user_rooms_room`");
        await queryRunner.query("DROP TABLE `pichat`.`user_rooms_room`");
        await queryRunner.query("DROP INDEX `IDX_535c742a3606d2e3122f441b26` ON `pichat`.`room`");
        await queryRunner.query("DROP TABLE `pichat`.`room`");
        await queryRunner.query("DROP INDEX `IDX_e2364281027b926b879fa2fa1e` ON `pichat`.`user`");
        await queryRunner.query("DROP TABLE `pichat`.`user`");
    }

}
