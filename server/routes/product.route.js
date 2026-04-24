import { Router } from "express";
import {
  getProducts,
  getPublishedProducts,
  getUnpublishedProducts,
  createProduct,
  deleteProduct,
  togglePublish,
  updateProduct
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();


router.use(protect);

router.get("/", getProducts);
router.get("/published", getPublishedProducts);
router.get("/unpublished", getUnpublishedProducts);
router.post("/", createProduct);
router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);
router.patch("/:id/toggle", togglePublish);

export default router;
