/*
  Warnings:

  - Added the required column `imageIndex` to the `Fish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fish" ADD COLUMN     "imageIndex" INTEGER NOT NULL;
