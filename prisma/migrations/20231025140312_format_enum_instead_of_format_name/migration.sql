/*
  Warnings:

  - The `format` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subscribed_formats` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Format" AS ENUM ('VIDEO', 'ARTICLE', 'PODCAST');

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "format",
ADD COLUMN     "format" "Format" NOT NULL DEFAULT 'ARTICLE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscribed_formats",
ADD COLUMN     "subscribed_formats" "Format"[];

-- DropEnum
DROP TYPE "Format_Name";
