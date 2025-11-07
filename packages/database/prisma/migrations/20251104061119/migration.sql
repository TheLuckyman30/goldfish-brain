-- CreateTable
CREATE TABLE "Authentication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_userId_key" ON "Authentication"("userId");

-- AddForeignKey
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
