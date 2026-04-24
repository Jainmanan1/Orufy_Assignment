import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productName: { type: String, required: true, trim: true },
    productType: { type: String, required: true, trim: true },
    quantityStock: { type: Number, required: true },
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    brandName: { type: String, required: true, trim: true },
    images: {
      type: [String],
      default: [],
    },
    exchangeOrReturn: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes",
    },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
