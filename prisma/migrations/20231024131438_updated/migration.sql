/*
  Warnings:

  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "audio" DROP NOT NULL;
