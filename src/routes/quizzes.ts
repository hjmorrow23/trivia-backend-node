import express from "express";
import * as QuizController from "../controllers/quizzes";
import { verifyToken } from "../middlewares/authJwt";

const router = express.Router();

router.post("/", [verifyToken], QuizController.createQuiz);
router.get("/", [verifyToken], QuizController.getQuizzes);
router.get("/:id", [verifyToken], QuizController.getQuiz);
router.put("/:id", [verifyToken], QuizController.updateQuiz);
router.delete("/:id", [verifyToken], QuizController.deleteQuiz);

export default router;