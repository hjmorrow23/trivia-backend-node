/*
  Warnings:

  - Added the required column `category` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "difficulty" INTEGER NOT NULL;
