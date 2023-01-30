import { Express } from "express";
import { getAllProducts } from "../controller/productController";

const router = new Express.Router();

router.get("/", getAllProducts)

export default router;