import { Product } from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPublishedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      userId: req.user.id,
      isPublished: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUnpublishedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      userId: req.user.id,
      isPublished: false,
    }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const {
    productName,
    productType,
    quantityStock,
    mrp,
    sellingPrice,
    brandName,
    images,
    exchangeOrReturn,
  } = req.body;

  if (
    !productName ||
    !productType ||
    quantityStock === undefined ||
    mrp === undefined ||
    sellingPrice === undefined ||
    !brandName
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const normalizedImages = Array.isArray(images)
      ? images.flat().filter(Boolean)
      : images
        ? [images]
        : [];

    const product = await Product.create({
      userId: req.user.id,
      productName,
      productType,
      quantityStock,
      mrp,
      sellingPrice,
      brandName,
      images: normalizedImages,
      exchangeOrReturn,
    });
    console.log("images from body:", req.body.images);
    console.log("normalizedImages:", normalizedImages);


    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isPublished = !product.isPublished;
    await product.save();

    return res.status(200).json({
      success: true,
      message: `Product ${
        product.isPublished ? "published" : "unpublished"
      } successfully`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }

  

};

export const updateProduct = async (req, res) => {
  const {
    productName,
    productType,
    quantityStock,
    mrp,
    sellingPrice,
    brandName,
    images,
    exchangeOrReturn,
  } = req.body;

  if (
    !productName ||
    !productType ||
    quantityStock === undefined ||
    mrp === undefined ||
    sellingPrice === undefined ||
    !brandName
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const normalizedImages = Array.isArray(images)
      ? images.flat(Infinity).filter(Boolean)
      : images
        ? [images]
        : [];

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        productName,
        productType,
        quantityStock,
        mrp,
        sellingPrice,
        brandName,
        images: normalizedImages,
        exchangeOrReturn,
      },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
