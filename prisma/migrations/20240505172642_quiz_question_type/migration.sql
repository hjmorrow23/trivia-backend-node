/*
  Warnings:

  - Added the required column `type` to the `QuizQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizQuestion" ADD COLUMN     "type" TEXT NOT NULL;
