-- CreateTable
CREATE TABLE "Fish" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "rarity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fish_taskId_key" ON "Fish"("taskId");

-- AddForeignKey
ALTER TABLE "Fish" ADD CONSTRAINT "Fish_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
