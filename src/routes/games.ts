import express from "express";
import GameController from "../controllers/games";
import { verifyToken } from "../middlewares/authJwt";

const router = express.Router();

router.post("/", [verifyToken], GameController.createGame);
router.get("/", [verifyToken], GameController.getGames);
router.get("/:id", [verifyToken], GameController.getGame);
router.put("/:id", [verifyToken], GameController.updateGame);
router.delete("/:id", [verifyToken], GameController.deleteGame);

export default router;