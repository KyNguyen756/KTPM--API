const express = require("express");
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const { authenticate, authorizeAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createProduct); // Chỉ admin có quyền tạo
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", authenticate, authorizeAdmin, updateProduct); // Chỉ admin có quyền cập nhật
router.delete("/:id", authenticate, authorizeAdmin, deleteProduct); // Chỉ admin có quyền xóa

module.exports = router;