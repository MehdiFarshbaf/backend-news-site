import express from "express";
import {getAllComments} from "../controllers/commentController.js";

const router = express.Router()

router.get("/", getAllComments)

export default router