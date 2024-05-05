-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerRecord" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "wins" INTEGER NOT NULL,
    "ties" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameHistory" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameResult" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "winnerIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "finalScoreId" TEXT NOT NULL,
    "currentScoreId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRound" (
    "id" TEXT NOT NULL,
    "gameHistoryId" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRoundSubmission" (
    "id" TEXT NOT NULL,
    "gameRoundId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionOptionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameRoundSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizQuestion" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "correctAnswerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizQuestionOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizQuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_gamePlayers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerRecord_playerId_key" ON "PlayerRecord"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_playerId_key" ON "Profile"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "GameHistory_gameId_key" ON "GameHistory"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GameResult_gameId_key" ON "GameResult"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Score_playerId_key" ON "Score"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "GameRound_gameHistoryId_key" ON "GameRound"("gameHistoryId");

-- CreateIndex
CREATE UNIQUE INDEX "GameRoundSubmission_gameRoundId_key" ON "GameRoundSubmission"("gameRoundId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizQuestion_quizId_key" ON "QuizQuestion"("quizId");

-- CreateIndex
CREATE UNIQUE INDEX "_gamePlayers_AB_unique" ON "_gamePlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_gamePlayers_B_index" ON "_gamePlayers"("B");

-- AddForeignKey
ALTER TABLE "PlayerRecord" ADD CONSTRAINT "PlayerRecord_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameHistory" ADD CONSTRAINT "GameHistory_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameResult" ADD CONSTRAINT "GameResult_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_finalScoreId_fkey" FOREIGN KEY ("finalScoreId") REFERENCES "GameResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_currentScoreId_fkey" FOREIGN KEY ("currentScoreId") REFERENCES "GameRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRound" ADD CONSTRAINT "GameRound_gameHistoryId_fkey" FOREIGN KEY ("gameHistoryId") REFERENCES "GameHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRoundSubmission" ADD CONSTRAINT "GameRoundSubmission_gameRoundId_fkey" FOREIGN KEY ("gameRoundId") REFERENCES "GameRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestion" ADD CONSTRAINT "QuizQuestion_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestionOption" ADD CONSTRAINT "QuizQuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuizQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gamePlayers" ADD CONSTRAINT "_gamePlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gamePlayers" ADD CONSTRAINT "_gamePlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
