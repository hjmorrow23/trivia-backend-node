import express from "express";
import * as PlayerController from "../controllers/players";

const router = express.Router();

router.post("/", PlayerController.createPlayer);
router.get("/", PlayerController.getPlayers);
router.get("/:id", PlayerController.getPlayer);
router.put("/:id", PlayerController.updatePlayer);
router.delete("/:id", PlayerController.deletePlayer);

export default router;