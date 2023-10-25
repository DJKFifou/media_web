/*
  Warnings:

  - You are about to drop the column `audio` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `publish_date` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the `_ArticleToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[link]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Format` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Theme` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Made the column `link` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Format` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Theme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Theme` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `title` on the `Theme` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `publish_date` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Theme_Name" ADD VALUE 'REGIONAL';

-- DropForeignKey
ALTER TABLE "_ArticleToUser" DROP CONSTRAINT "_ArticleToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToUser" DROP CONSTRAINT "_ArticleToUser_B_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "audio",
DROP COLUMN "publish_date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "link" SET NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Format" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Theme" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" "Theme_Name" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "title",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publish_date" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "is_hot" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_ArticleToUser";

-- CreateTable
CREATE TABLE "_UserLikedArticles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserRecommendedArticles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserFollows" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikedArticles_AB_unique" ON "_UserLikedArticles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikedArticles_B_index" ON "_UserLikedArticles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserRecommendedArticles_AB_unique" ON "_UserRecommendedArticles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRecommendedArticles_B_index" ON "_UserRecommendedArticles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "_UserFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollows_B_index" ON "_UserFollows"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Article_link_key" ON "Article"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Format_slug_key" ON "Format"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Media_slug_key" ON "Media"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_slug_key" ON "Theme"("slug");

-- CreateIndex
CREATE INDEX "Theme_slug_idx" ON "Theme"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- AddForeignKey
ALTER TABLE "_UserLikedArticles" ADD CONSTRAINT "_UserLikedArticles_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedArticles" ADD CONSTRAINT "_UserLikedArticles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRecommendedArticles" ADD CONSTRAINT "_UserRecommendedArticles_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRecommendedArticles" ADD CONSTRAINT "_UserRecommendedArticles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
