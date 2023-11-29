import express from "express";

//controllers
import {createNews, deleteNews, getAllNews, getNews, updateNews} from "../controllers/newsController.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router()


router.post("/", verifyToken, createNews)
router.get("/", getAllNews)
router.get("/:id", getNews)
router.put("/:id", verifyToken, updateNews)
router.delete("/:id", verifyToken, deleteNews)

export default router