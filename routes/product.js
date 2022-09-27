const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
} = require("../controllers/productController");

const router = require("express").Router();

router.get("/find/:id", getProductById);

router.get("/", getProducts);

// JUST FOR ADMINS, NEXT FEATURE
router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
