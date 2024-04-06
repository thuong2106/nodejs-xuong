import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { errorMessages, successMessages } from "../constants/message.js";
import User from "../models/User.model.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/jwt.js";
dotenv.config({ path: "./.env.local" });
const { JWT_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    // B1. Kiem tra du lieu dau vao
    const { email, password } = req.body;
  
    //! B2: Kiem tra email da ton tai chua?
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: errorMessages.EMAIL_EXISTED });
    }
    //! B3: Ma hoa mat khau
    const hashPass = await hashPassword(password);
    //! B4: Tao user moi
    const user = await User.create({ ...req.body, password: hashPass });
    user.password = undefined;
    return res.status(201).json({
      message: successMessages.REGISTER_SUCCESS,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // B1: Kiểm tra email và password
    const { email, password } = req.body;
   
    // B2: Kiem tra email tồn tại hay không
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: errorMessages.EMAIL_NOT_FOUND });
    }
    // B3: Kiểm tra password có khớp không
    if (!(await comparePassword(password, userExist.password))) {
      return res.status(400).json({ message: errorMessages.INVALID_PASSWORD });
    }
    // B4: Tạo token -> JWT (Json Web Token)
    const token = generateToken({_id: userExist._id}, "10d")
    // console.log(token);
    // B5: Trả về token cho client
    userExist.password = undefined;
    return res.status(201).json({
      message: successMessages.LOGIN_SUCCESS,
      token,
      user: userExist,
    });
  } catch (error) {
    next(error);
  }
};
