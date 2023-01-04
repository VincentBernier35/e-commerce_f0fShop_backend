const express = require("express");

const customerRouter = require("./customerRouter");
const categoryRouter = require("./categoryRouter");
const reviewRouter = require("./reviewRouter");
const shopping_cartRouter = require("./shopping_cartRouter");
const productRouter = require("./productRouter");

const router = express.Router();

router.use("/customer", customerRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/review", reviewRouter);
router.use("/shopping_cart", shopping_cartRouter);

module.exports = router;
