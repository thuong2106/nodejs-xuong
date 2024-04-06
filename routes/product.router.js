import { Router } from "express";
import productControllers from "../controllers/product.controller.js";
import validRequestBoby from "../middlewares/validRequestBody.js";
import productSchema from "../validations/product.validate.js"
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
const productRouter = Router();

// [GET]
productRouter.get("/", productControllers.getProducts);

// [GET BY ID]
productRouter.get("/:id", productControllers.getProductById);

productRouter.use(checkAuth, checkIsAdmin)
// [DELETE]
productRouter.put("/hide/:id", productControllers.softRemoveProductById);
productRouter.delete("/:id", productControllers.removeProductById);


// MIDDLEWARE
productRouter.use(validRequestBoby(productSchema))
// [CREATE]
productRouter.post("/", productControllers.createProduct);
// [UPDATE]
productRouter.put("/update/:id", productControllers.updateProductById);

export default productRouter;
