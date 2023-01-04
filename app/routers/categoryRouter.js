const express = require("express");
const categoryRouter = express.Router();
const authentication = require("../middlewares/authentication");

const { fetchAllCategory, fetchOneCategory, createNewCategory, modifyOneCategory, deleteOneCategory } = require("../controllers/categoryController");

// CRUD   toutes les routes ci dessous débute par api/category
categoryRouter.get("/", fetchAllCategory);
categoryRouter.get("/:id", fetchOneCategory);
categoryRouter.post("/", authentication, createNewCategory);
categoryRouter.patch("/:id", authentication, modifyOneCategory);
categoryRouter.delete("/:id", authentication, deleteOneCategory);

module.exports = categoryRouter;
