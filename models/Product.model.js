import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    images: Array,
    hide: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: "6610b6eed27f96febe9697e6",
    },
  },
  {
    timestamps: true, //thời gian model cập nhật sản phẩm
    versionKey: false, // không cần trường --v
  }
);

export default mongoose.model("products", productSchema);
