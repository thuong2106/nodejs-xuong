import { Router } from "express";
import productRouter from "./product.router.js";
import authRouter from "./auth.router.js";
import categoryRouter from "./categoty.router.js";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/auth", authRouter);

export default router;