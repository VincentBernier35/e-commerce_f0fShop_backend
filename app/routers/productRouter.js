const express = require("express");
const router = express.Router();

const { fetchAllProducts, fetchOneProduct, createNewProduct, modifyOneProduct, deleteOneProduct, fetchAllProductsFromCategory1, fetchAllProductsFromCategory2, fetchAllProductsFromCategory3, fetchAllProductsFromCategory4 } = require("../controllers/productController");

const authentication = require("../middlewares/authentication");

// CRUD   toutes les routes ci dessous débute par api/product
router.get("/", fetchAllProducts);
router.get("/:id", fetchOneProduct);
router.post("/", authentication, createNewProduct);
router.patch("/:id", authentication, modifyOneProduct);
router.delete("/:id", authentication, deleteOneProduct);

router.get("/category/1", fetchAllProductsFromCategory1);
router.get("/category/2", fetchAllProductsFromCategory2);
router.get("/category/3", fetchAllProductsFromCategory3);
router.get("/category/4", fetchAllProductsFromCategory4);

module.exports = router;
