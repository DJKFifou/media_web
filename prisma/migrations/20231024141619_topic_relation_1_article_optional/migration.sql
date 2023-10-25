/*
  Warnings:

  - You are about to drop the `_ThemeToTopic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `theme_id` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_format_id_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_media_id_fkey";

-- DropForeignKey
ALTER TABLE "_ThemeToTopic" DROP CONSTRAINT "_ThemeToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_ThemeToTopic" DROP CONSTRAINT "_ThemeToTopic_B_fkey";

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "link" DROP NOT NULL,
ALTER COLUMN "media_id" DROP NOT NULL,
ALTER COLUMN "audio" DROP NOT NULL,
ALTER COLUMN "format_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "theme_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ThemeToTopic";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_format_id_fkey" FOREIGN KEY ("format_id") REFERENCES "Format"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
