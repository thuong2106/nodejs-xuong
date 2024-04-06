import { errorMessages, successMessages } from "../constants/message.js";
import Category from "../models/Category.js";

const categoryControllers = {
  getCategories: async (req, res, next) => {
    try {
      const data = await Category.find().populate("products");
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
  createCategory: async (req, res, next) => {
    try {
      const data = await Category.create(req.body);
      if (!data) {
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
  getCategoryById: async (req, res, next) => {
    try {
      const data = await Category.findById(req.params.id).populate("products");
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
  updateCategoryById: async (req, res, next) => {
    try {
      const data = await Category.findByIdAndUpdate(
        `${req.params.id}`,
        req.body,
        {
          new: true,
        }
      );
      if (!data) {
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
  removeCategoryById: async (req, res, next) => {
    try {
      if (req.params.id === "6610b6eed27f96febe9697e6") {
        return res.status(400).json({ message: "Không thể xóa danh mục này!" });
      }

      const productsToUpdate = await Product.find({ category: req.params.id });
      await Promise.all(
        productsToUpdate.map(async (product) => {
          product.category = "6610b6eed27f96febe9697e6";
          await product.save();
        })
      );
      const data = await Category.findByIdAndDelete(req.params.id);

      if (data) {
        return res.status(200).json({
          message: successMessages.DELETE_CATEGORY_SUCCESS || "Successfully",
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
  softRemoveCategoryById: async (req, res, next) => {
    try {
      const data = await Category.findByIdAndUpdate(
        `${req.params.id}`,
        {
          hide: true,
        },
        {
          new: true,
        }
      );
      if (!data) {
        return res.status(400).json({ message: "Cập nhật danh mục thất bại!" });
      }
      return res.status(201).json({
        message: "Cập nhật danh mục thành công!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default categoryControllers;
