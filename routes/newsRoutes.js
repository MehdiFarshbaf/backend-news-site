import express from "express";

//controllers
import {
    createNews,
    deleteNews,
    detailsNews,
    getAllNews,
    getNews,
    lastNews, popularNews,
    updateNews
} from "../controllers/newsController.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router()

router.get("/last-news", lastNews)
router.get("/popular-news", popularNews)
router.get("/details/:id", detailsNews)

router.post("/", verifyToken, createNews)
router.get("/", getAllNews)
router.get("/:id", getNews)
router.put("/:id", verifyToken, updateNews)
router.delete("/:id", verifyToken, deleteNews)

export default router