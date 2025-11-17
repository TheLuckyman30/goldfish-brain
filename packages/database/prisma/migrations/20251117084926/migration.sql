/*
  Warnings:

  - Added the required column `gameId` to the `Fish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fish" ADD COLUMN     "gameId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_userId_key" ON "Game"("userId");

-- AddForeignKey
ALTER TABLE "Fish" ADD CONSTRAINT "Fish_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
