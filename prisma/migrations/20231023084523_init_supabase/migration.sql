-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Theme_Name" AS ENUM ('GEOPOLITIC', 'SPORT', 'FASHION', 'POLITIC', 'GEOGRAPHY', 'HISTORY', 'LIFESTYLE', 'ENVIRONMENT', 'HEALTH', 'CULTURE', 'TRAVEL', 'INTERNATIONAL', 'NATIONAL');

-- CreateEnum
CREATE TYPE "Format_Name" AS ENUM ('VIDEO', 'ARTICLE', 'PODCAST');

-- CreateEnum
CREATE TYPE "Article_Frequency" AS ENUM ('DAY', 'WEEK', 'MONTH');

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "topicId" TEXT,
    "content" TEXT NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL,
    "reading_duration" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user_name" TEXT,
    "type" "Role" NOT NULL DEFAULT 'USER',
    "article_number" INTEGER,
    "article_frequency" "Article_Frequency",
    "hasAccess" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "title" "Theme_Name" NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Format" (
    "id" TEXT NOT NULL,
    "title" "Format_Name" NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Format_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "introduction_text" TEXT NOT NULL,
    "is_hot" BOOLEAN NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ThemeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ThemeToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FormatToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToUser_AB_unique" ON "_ArticleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToUser_B_index" ON "_ArticleToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ThemeToUser_AB_unique" ON "_ThemeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ThemeToUser_B_index" ON "_ThemeToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ThemeToTopic_AB_unique" ON "_ThemeToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_ThemeToTopic_B_index" ON "_ThemeToTopic"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FormatToUser_AB_unique" ON "_FormatToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FormatToUser_B_index" ON "_FormatToUser"("B");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToUser" ADD CONSTRAINT "_ArticleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToUser" ADD CONSTRAINT "_ArticleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ThemeToUser" ADD CONSTRAINT "_ThemeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ThemeToUser" ADD CONSTRAINT "_ThemeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ThemeToTopic" ADD CONSTRAINT "_ThemeToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "Theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ThemeToTopic" ADD CONSTRAINT "_ThemeToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FormatToUser" ADD CONSTRAINT "_FormatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Format"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FormatToUser" ADD CONSTRAINT "_FormatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
