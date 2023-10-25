/*
  Warnings:

  - You are about to drop the column `format_id` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the `Format` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FormatToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_format_id_fkey";

-- DropForeignKey
ALTER TABLE "_FormatToUser" DROP CONSTRAINT "_FormatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FormatToUser" DROP CONSTRAINT "_FormatToUser_B_fkey";

-- DropIndex
DROP INDEX "Theme_slug_idx";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "format_id",
ADD COLUMN     "format" "Format_Name" NOT NULL DEFAULT 'ARTICLE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscribed_formats" "Format_Name"[];

-- DropTable
DROP TABLE "Format";

-- DropTable
DROP TABLE "_FormatToUser";
