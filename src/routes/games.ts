import express from "express";
import GameController from "../controllers/games";

const router = express.Router();

router.post("/", GameController.createGame);
router.get("/", GameController.getGames);
router.get("/:id", GameController.getGame);
router.put("/:id", GameController.updateGame);
router.delete("/:id", GameController.deleteGame);

export default router;