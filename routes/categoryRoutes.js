import express from "express";

// controllers
import {createCategory, deleteCategory, getAllCategory, updateCategory} from "../controllers/categoryController.js";

// middlewares
import {verifyToken} from "../middlewares/verifyToken.js";
import {validation} from "../middlewares/validation.js";

// schemas
import {categorySchema} from "../schemas/categorySchema.js";

const router = express.Router()

// crud category
router.get("/", getAllCategory)
router.post("/", verifyToken, validation(categorySchema), createCategory)
router.delete("/:id", verifyToken, deleteCategory)
router.put("/:id", verifyToken, validation(categorySchema), updateCategory)

export default router