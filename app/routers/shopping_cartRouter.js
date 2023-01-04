const express = require("express");
const router = express.Router();


const { fetchOneShopping_cart, createNewShopping_cart, deleteOneShopping_Cart } = require("../controllers/shopping_cartController");

// CRUD   toutes les routes ci dessous débute par api/customer/shopping_cart

router.get("/:id", fetchOneShopping_cart);
router.post("/", createNewShopping_cart);
// router.patch("/:id", modifyOneShopping_Cart);
router.delete("/:id", deleteOneShopping_Cart);

module.exports = router;
