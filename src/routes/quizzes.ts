import express from "express";
import * as QuizController from "../controllers/quizzes";

const router = express.Router();

router.post("/", QuizController.createQuiz);
router.get("/", QuizController.getQuizzes);
router.get("/:id", QuizController.getQuiz);
router.put("/:id", QuizController.updateQuiz);
router.delete("/:id", QuizController.deleteQuiz);

export default router;