import { getAllProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } from "../controller/productController.js";
import express from "express";

const router = new express.Router();

router.get("/products", getAllProducts)
router.get("/product/:id", getSingleProduct)

router.post("/admin/product/new", newProduct)
router.put("/admin/product/:id", updateProduct)
router.delete("/admin/product/:id", deleteProduct)

export default router; 