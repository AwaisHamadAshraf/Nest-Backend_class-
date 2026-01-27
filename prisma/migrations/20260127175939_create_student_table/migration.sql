-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rollNo" INTEGER NOT NULL,
    "project" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_rollNo_key" ON "Student"("rollNo");
