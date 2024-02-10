import express, { Router } from "express";
import { deleteUserByIdController, getAllUsers, loginUser, registerUser } from "../controllers/user.controllers.js";
import { isAdmin, verifyToken } from "../middleware/auth.middleware.js";

const router = Router()

router.get('/users', verifyToken, isAdmin, getAllUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.delete('/delete-user/:id', deleteUserByIdController)


export default router