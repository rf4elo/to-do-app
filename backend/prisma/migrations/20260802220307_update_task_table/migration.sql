/*
  Warnings:

  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "userId" SET DATA TYPE BIGINT,
ALTER COLUMN "isComplete" SET DEFAULT false,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");
