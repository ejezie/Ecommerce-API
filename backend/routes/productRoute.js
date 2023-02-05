import { Express } from "express";
import { getAllProducts, newProduct } from "../controller/productController";

const router = new Express.Router();

router.get("/products", getAllProducts)
router.post("/product/new", getAllProducts)

export default router; 