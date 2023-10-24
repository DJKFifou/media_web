/*
  Warnings:

  - Added the required column `audio` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format_id` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audio` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "audio" TEXT NOT NULL,
ADD COLUMN     "format_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "audio" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_format_id_fkey" FOREIGN KEY ("format_id") REFERENCES "Format"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
