import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import { loginSchema, registerSchema } from "../validations/auth.validate.js";
import validRequestBoby from "../middlewares/validRequestBody.js";

const authRouter = Router();
authRouter.post("/register", validRequestBoby(registerSchema), register);
authRouter.post("/login", validRequestBoby(loginSchema), login);

export default authRouter;
