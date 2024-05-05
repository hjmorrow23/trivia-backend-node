/*
  Warnings:

  - Added the required column `playerId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "playerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
