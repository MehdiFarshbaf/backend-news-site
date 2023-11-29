import express from "express";

// middlewares
import {verifyToken} from "../middlewares/verifyToken.js";

// controllers
import {createVideo, deleteVideo, getAllVideos, getSingleVideo} from "../controllers/videoController.js";

const router = express.Router()

router.get("/", verifyToken, getAllVideos)
router.get("/get-last-video", getSingleVideo)
router.post("/", verifyToken, createVideo)
router.delete("/:id", verifyToken, deleteVideo)

export default router