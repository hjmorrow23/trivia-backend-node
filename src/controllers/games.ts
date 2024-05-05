import { Request, Response } from "express";
import { prisma } from "../server";
import { GameStatuses } from "../types/game";

const createGame = async (req: Request, res: Response) => {
    try {
        const { playerId, quizId } = req.body;
        const newGame = await prisma.game.create({
            data: {
                players: {
                    connect: [playerId]
                },
                quiz: {
                    connect: quizId
                },
                hostPlayer: playerId,
                status: GameStatuses.LOBBY,
            },
        });
        res.status(200).json(newGame);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getGames = async (req: Request, res: Response) => {
    try {
        const games = await prisma.game.findMany();
        res.status(200).json(games);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getGame = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const game = await prisma.game.findUnique({
            where: {
                id,
            },
        });
        res.status(200).json(game);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const updateGame = async (req: Request, res: Response) => {
    try {
        const { id, players, playerId, quizId } = req.body;
        const updatedGame = await prisma.game.update({
            where: {
                id,
            },
            data: {
                players,
                hostPlayer: playerId,
                quiz: {
                    connect: quizId
                },
            },
        });
        res.status(200).json(updatedGame);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const deleteGame = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const deletedGame = await prisma.game.delete({
            where: {
                id,
            },
        });
        res.status(200).json(deletedGame);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

// const deleteAllGames = async (req: Request, res: Response) => {
//   try {
//     const deletedGames = await prisma.game.deleteMany();
//     res.status(200).json(deletedGames);
//   } catch (e) {
//     res.status(500).json({ error: e });
//   }
// };

// GAME HISTORY

const createGameHistory = async (req: Request, res: Response) => {
    try {
        const { gameId, gameRounds } = req.body;
        const newGameHistory = await prisma.gameHistory.create({
            data: {
                game: {
                    connect: gameId
                },
                gameRounds
            }
        })
        res.status(200).json(newGameHistory);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

const getGameHistories = async (req: Request, res: Response) => {
    try {
        const gameHistories = await prisma.gameHistory.findMany();
        res.status(200).json(gameHistories);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getGameHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const gameHistory = await prisma.gameHistory.findUnique({
            where: {
                id,
            }
        });
        res.status(200).json(gameHistory);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const updateGameHistory = async (req: Request, res: Response) => {
    try {
        const { id, gameRounds } = req.body;
        const updatedGameHistory = await prisma.gameHistory.update({
            where: {
                id,
            },
            data: {
                gameRounds,
            },
        });
        res.status(200).json(updatedGameHistory);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

const deleteGameHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const deletedGameHistory = await prisma.gameHistory.delete({
            where: {
                id,
            },
        });
        res.status(200).json(deletedGameHistory);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

// GAME RESULT

const createGameResult = async (req: Request, res: Response) => {
    try {
        const { gameId, winnerIds, finalScores } = req.body;
        const newGameResult = await prisma.gameResult.create({
            data: {
                game: {
                    connect: gameId
                },
                winnerIds,
                finalScores
            }
        })
        res.status(200).json(newGameResult);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

const getGameResults = async (req: Request, res: Response) => {
    try {
        const gameResults = await prisma.gameResult.findMany();
        res.status(200).json(gameResults);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getGameResult = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const gameResult = await prisma.gameResult.findUnique({
            where: {
                id,
            }
        });
        res.status(200).json(gameResult);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const updateGameResult = async (req: Request, res: Response) => {
    try {
        const { id, winnerIds, finalScores } = req.body;
        const updatedGameResult = await prisma.gameResult.update({
            where: {
                id,
            },
            data: {
                winnerIds,
                finalScores,
            },
        });
        res.status(200).json(updatedGameResult);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const deleteGameResult = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const deletedGameResult = await prisma.gameResult.delete({
            where: {
                id,
            },
        });
        res.status(200).json(deletedGameResult);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

// GAME ROUND

const createGameRound = async (req: Request, res: Response) => {
    try {
        const { gameHistoryId, roundNumber, currentScore, submissions } = req.body;
        const newGameRound = await prisma.gameRound.create({
            data: {
                gameHistory: {
                    connect: gameHistoryId
                },
                roundNumber,
                currentScore,
                submissions
            }
        })
        res.status(200).json(newGameRound);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

const getGameRounds = async (req: Request, res: Response) => {
    try {
        const gameRounds = await prisma.gameRound.findMany();
        res.status(200).json(gameRounds);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getGameRound = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const gameRound = await prisma.gameRound.findUnique({
            where: {
                id,
            }
        });
        res.status(200).json(gameRound);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const updateGameRound = async (req: Request, res: Response) => {
    try {
        const { id, roundNumber, currentScore, submissions } = req.body;
        const updatedGameRound = await prisma.gameRound.update({
            where: {
                id,
            },
            data: {
                roundNumber,
                currentScore,
                submissions,
            },
        });
        res.status(200).json(updatedGameRound);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const deleteGameRound = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const deletedGameRound = await prisma.gameRound.delete({
            where: {
                id,
            },
        });
        res.status(200).json(deletedGameRound);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

// GAME ROUND SUBMISSION

const createGameRoundSubmission = async (req: Request, res: Response) => {
    try {
        const {
            gameRoundId,
            playerId,
            questionId,
            questionOptionId,
            answer,
            isCorrect
        } = req.body;
        const newGameRoundSubmission = await prisma.gameRoundSubmission.create({
            data: {
                gameRound: {
                    connect: gameRoundId
                },
                player: {
                    connect: playerId
                },
                questionId,
                questionOption: {
                    connect: questionOptionId
                },
                answer,
                isCorrect
            }
        })
        res.status(200).json(newGameRoundSubmission);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

const getGameRoundSubmissions = async (req: Request, res: Response) => {
    try {
        const gameRoundSubmissions = await prisma.gameRoundSubmission.findMany();
        res.status(200).json(gameRoundSubmissions);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getGameRoundSubmission = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const gameRoundSubmission = await prisma.gameRoundSubmission.findUnique({
            where: {
                id,
            }
        });
        res.status(200).json(gameRoundSubmission);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const updateGameRoundSubmission = async (req: Request, res: Response) => {
    try {
        const { id, questionId, questionOptionId, answer, isCorrect } = req.body;
        const updatedGameRoundSubmission = await prisma.gameRoundSubmission.update({
            where: {
                id,
            },
            data: {
                questionId,
                questionOption: {
                    connect: questionOptionId
                },
                answer,
                isCorrect,
            },
        });
        res.status(200).json(updatedGameRoundSubmission);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const deleteGameRoundSubmission = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const deletedGameRoundSubmission = await prisma.gameRoundSubmission.delete({
            where: {
                id,
            },
        });
        res.status(200).json(deletedGameRoundSubmission);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

export default {
    createGame,
    getGames,
    getGame,
    updateGame,
    deleteGame,
    //   deleteAllGames,
    createGameHistory,
    getGameHistories,
    getGameHistory,
    updateGameHistory,
    deleteGameHistory,
    createGameResult,
    getGameResults,
    getGameResult,
    updateGameResult,
    deleteGameResult,
    createGameRound,
    getGameRounds,
    getGameRound,
    updateGameRound,
    deleteGameRound,
    createGameRoundSubmission,
    getGameRoundSubmissions,
    getGameRoundSubmission,
    updateGameRoundSubmission,
    deleteGameRoundSubmission,
};
