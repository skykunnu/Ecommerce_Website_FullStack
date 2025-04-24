import express from "express";
import {
  addProduct,
  fetchCategories,
  fetchProduct,
  addCategory,
  fetchHotDeals,
  deleteProductOrCategory,
} from "../controllers/Product.js";
import upload from "../middlewares/multer.js";

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/get", fetchProduct);
productRouter.get("/get/:id", fetchProduct);
productRouter.get("/category", fetchCategories);
productRouter.post("/category/add", upload.single("image"), addCategory);
productRouter.delete("/:id", deleteProductOrCategory);

export default productRouter;
