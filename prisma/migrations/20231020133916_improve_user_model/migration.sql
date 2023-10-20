/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `password`,
    MODIFY `user_name` VARCHAR(191) NULL,
    MODIFY `type` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
