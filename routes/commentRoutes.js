import express from "express";

// controllers
import {createComment, deleteComment, getAllComments, updateComment} from "../controllers/commentController.js";

// middlewares
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router()

// crud comment
router.get("/", verifyToken, getAllComments)
router.post("/", createComment)
router.delete("/:id", verifyToken, deleteComment)
router.put("/:id", verifyToken, updateComment)

export default router