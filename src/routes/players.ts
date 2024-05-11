import express from "express";
import * as PlayerController from "../controllers/players";
import { verifyToken } from "../middlewares/authJwt";

const router = express.Router();

router.get("/", [verifyToken], PlayerController.getPlayers);
router.put("/:id/playerRecord", [verifyToken], PlayerController.updatePlayerRecord);
router.get("/:id/clearRecord", [verifyToken], PlayerController.clearPlayerRecord);
router.put("/:id/playerProfile", [verifyToken], PlayerController.updatePlayerProfile);
router.put("/:id/status", [verifyToken], PlayerController.updatePlayerStatus);
router.put("/:id", [verifyToken], PlayerController.updatePlayer);
router.delete("/:id", [verifyToken], PlayerController.deletePlayer);

export default router;