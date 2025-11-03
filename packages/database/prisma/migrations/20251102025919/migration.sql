-- DropForeignKey
ALTER TABLE "public"."Folder" DROP CONSTRAINT "Folder_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_taskListId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TaskList" DROP CONSTRAINT "TaskList_userId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "taskListId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskList" ADD CONSTRAINT "TaskList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskListId_fkey" FOREIGN KEY ("taskListId") REFERENCES "TaskList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
