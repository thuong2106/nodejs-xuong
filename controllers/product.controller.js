import { errorMessages, successMessages } from "../constants/message.js";
import Category from "../models/Category.js";
import Product from "../models/Product.model.js";

const productControllers = {
  getProducts: async (req, res, next) => {
    try {
      const data = await Product.find().populate("category");
      if (data && data.length > 0) {
        return res.status(200).json({
          message: "Lấy danh sách sản phẩm thành công",
          data,
        });
      }
      return res.status(404).json({ message: "Không có sản phẩm nào!" });
    } catch (error) {
      next(error);
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      const updateCategory = await Category.findByIdAndUpdate(
        data.category,
        {
          $push: { products: data._id },
        },
        {
          new: true,
        }
      );
      if (!data || !updateCategory) {
        return res.status(400).json({ message: "Thêm sản phẩm thất bại!" });
      }
      return res.status(201).json({
        message: "Thêm sản phẩm thành công!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const data = await Product.findById(req.params.id).populate("category");
      if (!data) {
        return res.status(400).json({ message: "Lấy sản phẩm thất bại!" });
      }
      return res.status(201).json({
        message: "Lấy sản phẩm thành công!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  updateProductById: async (req, res, next) => {
    try {
      const data = await Product.findByIdAndUpdate(
        `${req.params.id}`,
        req.body,
        {
          new: true,
        }
      );
      const updateCategory = await Category.findByIdAndUpdate(
        data.category,
        {
          $push: { products: data._id },
        },
        {
          new: true,
        }
      );
      if (!data || !updateCategory) {
        return res.status(400).json({ message: errorMessages.UPDATE_FAIL });
      }
      return res.status(201).json({
        message: successMessages.UPDATE_PRODUCT_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  removeProductById: async (req, res, next) => {
    try {
      const data = await Product.findByIdAndDelete(req.params.id);

      if (data) {
        return res.status(200).json({
          message: successMessages.DELETE_PRODUCT_SUCCESS,
          data,
        });
      }
      return res.status(400).json({
        message: errorMessages.DELETE_FAIL,
      });
    } catch (error) {
      next(error);
    }
  },
  softRemoveProductById: async (req, res, next) => {
    try {
      const data = await Product.findByIdAndUpdate(
        `${req.params.id}`,
        {
          hide: true,
        },
        {
          new: true,
        }
      );
      if (!data) {
        return res.status(400).json({ message: "Cập nhật sản phẩm thất bại!" });
      }
      return res.status(201).json({
        message: "Cập nhật sản phẩm thành công!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default productControllers;
