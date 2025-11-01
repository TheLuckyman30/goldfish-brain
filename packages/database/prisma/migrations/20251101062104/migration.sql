/*
  Warnings:

  - Made the column `createdAt` on table `Folder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Folder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `TaskList` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `TaskList` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TaskList" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;
