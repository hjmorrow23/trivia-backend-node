import { Request, Response } from "express";
import { prisma } from "../server";

export const createQuiz = async (req: Request, res: Response) => {
    try {
        const { type, questions } = req.body;
        const quiz = await prisma.quiz.create({
            data: {
                type,
                questions: {
                    create: questions,
                },
            },
        });
        res.status(200).json(quiz);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const getQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await prisma.quiz.findMany({
            include: {
                questions: true,
            },
        });
        res.status(200).json(quizzes);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const getQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const quiz = await prisma.quiz.findUnique({
            where: {
                id,
            },
            include: {
                questions: true,
            },
        });
        res.status(200).json(quiz);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const updateQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { type, questions } = req.body;
        const quiz = await prisma.quiz.update({
            where: {
                id,
            },
            data: {
                type,
                questions: {
                    update: questions,
                },
            },
        });
        res.status(200).json(quiz);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const deleteQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const quiz = await prisma.quiz.delete({
            where: {
                id,
            },
        });
        res.status(200).json(quiz);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const createQuizQuestion = async (req: Request, res: Response) => {
    try {
        const { quizId, question, options, correctAnswerId } = req.body;
        const quizQuestion = await prisma.quizQuestion.create({
            data: {
                quiz: {
                    connect: quizId,
                },
                question,
                options: {
                    create: options,
                },
                correctAnswerId,
            },
        });
        res.status(200).json(quizQuestion);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}


export const addQuestionsToQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { questions } = req.body;
        const quiz = await prisma.quiz.update({
            where: {
                id,
            },
            data: {
                questions: {
                    create: questions,
                },
            },
        });
        res.status(200).json(quiz);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}


export const deleteQuestionFromQuiz = async (req: Request, res: Response) => {
    try {
        const { id, questionId } = req.params;
        const quiz = await prisma.quiz.update({
            where: {
                id,
            },
            data: {
                questions: {
                    delete: {
                        id: questionId,
                    },
                },
            },
        });
        res.status(200).json(quiz);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const updateQuizQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { question, options, correctAnswerId } = req.body;
        const quizQuestion = await prisma.quizQuestion.update({
            where: {
                id,
            },
            data: {
                question,
                options: {
                    update: options,
                },
                correctAnswerId,
            },
        });
        res.status(200).json(quizQuestion);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const deleteQuizQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const quizQuestion = await prisma.quizQuestion.delete({
            where: {
                id,
            },
        });
        res.status(200).json(quizQuestion);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const getQuizQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const quizQuestion = await prisma.quizQuestion.findUnique({
            where: {
                id,
            },
        });
        res.status(200).json(quizQuestion);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const createQuizQuestionOption = async (req: Request, res: Response) => {
    try {
        const { questionId, option, isCorrect } = req.body;
        const quizQuestionOption = await prisma.quizQuestionOption.create({
            data: {
                question: {
                    connect: questionId,
                },
                option,
                isCorrect,
            },
        });
        res.status(200).json(quizQuestionOption);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const updateQuizQuestionOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { option, isCorrect } = req.body;
        const quizQuestionOption = await prisma.quizQuestionOption.update({
            where: {
                id,
            },
            data: {
                option,
                isCorrect,
            },
        });
        res.status(200).json(quizQuestionOption);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const deleteQuizQuestionOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const quizQuestionOption = await prisma.quizQuestionOption.delete({
            where: {
                id,
            },
        });
        res.status(200).json(quizQuestionOption);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}
