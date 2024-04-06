import { Router } from "express";
import categoryControllers from "../controllers/category.controller.js";
import validRequestBoby from "../middlewares/validRequestBody.js";
import categorySchema from "../validations/categoty.validate.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
const categoryRouter = Router();

// [GET]
categoryRouter.get("/", categoryControllers.getCategories);
// [GET BY ID]
categoryRouter.get("/:id", categoryControllers.getCategoryById);
categoryRouter.use(checkAuth, checkIsAdmin);
// [DELETE]
categoryRouter.put("/hide/:id", categoryControllers.softRemoveCategoryById);
categoryRouter.delete("/:id", categoryControllers.removeCategoryById);
// MIDDLEWARE
categoryRouter.use(validRequestBoby(categorySchema));
// [CREATE]
categoryRouter.post("/", categoryControllers.createCategory);
// [UPDATE]
categoryRouter.put("/update/:id", categoryControllers.updateCategoryById);

export default categoryRouter;
