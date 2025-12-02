-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TaskList" ADD COLUMN     "numTasks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "numTasksCompleted" INTEGER NOT NULL DEFAULT 0;
