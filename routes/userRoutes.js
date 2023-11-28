import express from "express";

import {
    deleteUser,
    editUser,
    getAllUsers, getProfile,
    loginUser,
    logoutUser,
    registerUser,
    updateProfile
} from "../controllers/userController.js";

// middlewares
import {verifyToken} from "../middlewares/verifyToken.js";
import {validation} from "../middlewares/validation.js";

// validation schemas
import {userLoginSchema, userRegisterSchema, userUpdateSchema} from "../schemas/userSchemas.js";

const router = express.Router()

// auth user
router.post("/register", validation(userRegisterSchema), registerUser)
router.post("/login", validation(userLoginSchema), loginUser)
router.post("/logout", verifyToken, logoutUser)
router.get("/get-profile", verifyToken, getProfile)

//update profile by user
router.put("/profile", verifyToken, updateProfile)

// crud user
router.get("/", verifyToken, getAllUsers)
router.delete("/:id", verifyToken, deleteUser)
router.put("/:id", verifyToken, validation(userUpdateSchema), editUser)

export default router