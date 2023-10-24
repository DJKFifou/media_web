/*
  Warnings:

  - You are about to drop the column `content` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `topicId` on the `Article` table. All the data in the column will be lost.
  - Added the required column `image` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_id` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_topicId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "content",
DROP COLUMN "topicId",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "media_id" TEXT NOT NULL,
ADD COLUMN     "topic_id" TEXT;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
