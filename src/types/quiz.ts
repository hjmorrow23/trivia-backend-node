import Prisma from "@prisma/client";

export enum QuizTypes {
    TRIVIA = "trivia",
}

export enum QuizQuestionTypes {
    MULTIPLE_CHOICE = "multiple_choice",
    TRUE_FALSE = "true_false",
    FIFTY_FIFTY = "fifty_fifty",
    FILL_IN_THE_BLANK = "fill_in_the_blank",
}

export type QuizRequestPayload = {
    type: QuizTypes;
    questions: any;
    difficulty: number;
    categoryId: string;
}

export type QuizQuestionRequestPayload = {
    type: QuizQuestionTypes;
    question: string;
    quizId: Prisma.Quiz | undefined;
    options?: Prisma.QuizQuestionOption[];
    correctAnswerId: string;
}