import express from "express";
import * as PlayerController from "../controllers/players";
import { verifyToken } from "../middlewares/authJwt";

const router = express.Router();

router.get("/", [verifyToken], PlayerController.getPlayers);
router.get("/:id", [verifyToken], PlayerController.getPlayer);
router.put("/:id", [verifyToken], PlayerController.updatePlayer);
router.delete("/:id", [verifyToken], PlayerController.deletePlayer);

export default router;