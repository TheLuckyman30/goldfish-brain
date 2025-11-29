/*
  Warnings:

  - A unique constraint covering the columns `[gameId]` on the table `Fish` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Fish_gameId_key" ON "Fish"("gameId");
