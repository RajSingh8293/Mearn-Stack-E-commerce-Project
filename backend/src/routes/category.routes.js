import express, { Router } from "express"
import { addCategoryController, deleteCategoryByIdController, getAllCategoryController, getCategoryByIdController, updateCategoryController } from "../controllers/category.controllers.js"

const router = Router()


router.get('/categories', getAllCategoryController)
router.post('/category', addCategoryController)
router.put('/category/:id', updateCategoryController)
router.get('/category/:id', getCategoryByIdController)
router.delete('/category/:id', deleteCategoryByIdController)

export default router