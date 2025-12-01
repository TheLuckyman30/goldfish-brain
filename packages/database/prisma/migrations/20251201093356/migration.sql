/*
  Warnings:

  - A unique constraint covering the columns `[linkedTaskListId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `linkedTaskListId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "linkedTaskListId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_linkedTaskListId_key" ON "Game"("linkedTaskListId");
