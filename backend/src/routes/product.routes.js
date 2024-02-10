import express, { Router } from "express";
import { addProductController, deteleProductByIdController, getProductByIdController, getProductsController, updateProductController } from "../controllers/product.controllers.js";
import { upload } from "../middleware/file.middleware.js";
import { isAdmin, verifyToken } from "../middleware/auth.middleware.js";

const router = Router()

router.post('/product', upload.single("productImage"), addProductController)
router.get('/products', getProductsController)
router.get('/product/:id', getProductByIdController)
router.put('/product/:id', verifyToken, isAdmin, upload.single("productImage"), updateProductController)
router.delete('/product/:id', verifyToken, isAdmin, deteleProductByIdController)
// let's see later 
// router.get('/search/:key', searchProductController)
// router.patch("/avatar", upload.single("avatar"), updateProductImage)



export default router