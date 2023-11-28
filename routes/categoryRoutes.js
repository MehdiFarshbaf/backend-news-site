import express from "express";
import {getAllCategory} from "../controllers/categoryController.js";

const router = express.Router()

// crud category
router.get("/", getAllCategory)
export default router