import express from "express";
import GameController from "../controllers/games";

const router = express.Router();

router.post("/create", GameController.createBlogPost);
// router.post("/createPostAndComments", GameController.createPostAndComments);
router.get("/getall", GameController.getBlogPosts);
router.get("/get/:id", GameController.getBlogPost);
router.put("/update/:id", GameController.updateBlogPost);
router.delete("/delete/:id", GameController.deleteBlogPost);
router.delete("/deleteall", GameController.deleteAllBlogPosts);
router.post("/like", GameController.likeBlogPost);

export default router;