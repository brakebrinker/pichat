import {MigrationInterface, QueryRunner} from "typeorm";

export class createMessageTable1631247492686 implements MigrationInterface {
    name = 'createMessageTable1631247492686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `pichat`.`message` (`id` char(36) NOT NULL, `text` text NOT NULL, `createdAt` datetime(6) NOT NULL, `updatedAt` datetime(6) NOT NULL, `creatorId` char(36) NULL, `roomId` char(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `pichat`.`message` ADD CONSTRAINT `FK_e04040c4ea7133eeddefff6417d` FOREIGN KEY (`creatorId`) REFERENCES `pichat`.`user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `pichat`.`message` ADD CONSTRAINT `FK_fdfe54a21d1542c564384b74d5c` FOREIGN KEY (`roomId`) REFERENCES `pichat`.`room`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pichat`.`message` DROP FOREIGN KEY `FK_fdfe54a21d1542c564384b74d5c`");
        await queryRunner.query("ALTER TABLE `pichat`.`message` DROP FOREIGN KEY `FK_e04040c4ea7133eeddefff6417d`");
        await queryRunner.query("DROP TABLE `pichat`.`message`");
    }

}
