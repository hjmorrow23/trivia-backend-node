-- AddForeignKey
ALTER TABLE "GameRoundSubmission" ADD CONSTRAINT "GameRoundSubmission_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRoundSubmission" ADD CONSTRAINT "GameRoundSubmission_questionOptionId_fkey" FOREIGN KEY ("questionOptionId") REFERENCES "QuizQuestionOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
