import { GameHistory, GameResult, Quiz } from '@prisma/client'
import type { Player } from './player'

export enum GameStatuses {
    INACTIVE = "inactive",
    LOBBY = "lobby",
    PLAYING = "playing",
    COMPLETE = "complete",
    ARCHIVED = "archived"
}

export type Game = {
    id?: string
    players: Player[]
    status: GameStatuses
    quiz: Quiz
    quizId: string
    gameHistory: GameHistory
    result: GameResult
}





