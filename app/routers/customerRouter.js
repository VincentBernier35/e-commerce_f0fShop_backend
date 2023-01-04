const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const { fetchAllCustomers, fetchOneCustomer, createNewCustomer, modifyOneCustomer, deleteOneCustomer, signInUser, signOutUser } = require("../controllers/customercontroller");

// CRUD   prefix endpoint =>  api/customer
router.get("/", fetchAllCustomers);
router.get("/:id", fetchOneCustomer);
router.patch("/:id", authentication, modifyOneCustomer);
router.delete("/:id", authentication, deleteOneCustomer);

// signIn, signUp, signOut
router.post("/signin", signInUser);
router.post("/signup", createNewCustomer);
router.get("/signout", signOutUser);

module.exports = router;
