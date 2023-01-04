const shopping_cartDataMapper = require("../models/shopping_cartDataMapper");
require("dotenv").config();

//********************************************************* */ CREATE SHOPPING_CART
const createNewShopping_cart = async (req, res) => {
  const shopping_cart = req.body;

  const { created_at, customer_id, product_id } = req.body;



  if (!created_at) {
    return res.status(400).json({error: "il manque la date de création" });
  }
  if (!customer_id) {
    return res.status(400).json({error: "il manque l'ID client" });
  }
  if (!product_id) {
    return res.status(400).json({error: "il manque l'" });
  }

  const result = await shopping_cartDataMapper.createNewShopping_cartDataMapper(shopping_cart);
  console.log("A new shopping_cart was inserted into DB", result);

  if (!result) {
    return res.status(400).json({error: "panier non disponible !"});
  }

  return res.status(200).json(result);
};


//********************************************************* */ READ SHOPPING_CART

const fetchOneShopping_cart = async (req, res) => {
  const { id } = req.params;

  const shopping_cart = await shopping_cartDataMapper.fetchOneShopping_cartDataMapper(id);

  if(!shopping_cart) {
    return res.status(404).json({error: `le panier avec l'id : ${id} n'a pas été trouvé`});
  }

  return res.status(200).json(shopping_cart);

};

//********************************************************* */ UPDATE SHOPPING_CART

// const modifyOneShopping_Cart = async (req, res) => {
//   const shopping_cart = await shopping_cartDataMapper.fetchOneShopping_cart(req.params.id);

//   if (!shopping_cart) {
//     console.log("This shopping_cart does not exists");
//   }

//   if (req.body.family_name || req.body.first_name || req.body.address || req.body.city || req.body.zip_code || req.body.phone || req.body.email || req.body.pwd) {
//     const existingCustomer = await shopping_cartDataMapper.isUnique(req.body, req.params.id);
//     if (existingCustomer) {
//       let field;
//       if (existingCustomer.family_name === req.body.family_name) {
//         field = "family_name";
//       }
//       if (existingCustomer.first_name === req.body.first_name) {
//         field = "first_name";
//       }
//       if (existingCustomer.address === req.body.address) {
//         field = "address";
//       }
//       if (existingCustomer.city === req.body.city) {
//         field = "city";
//       }
//       if (existingCustomer.zip_code === req.body.zip_code) {
//         field = "zip_code";
//       }
//       if (existingCustomer.phone === req.body.phone) {
//         field = "phone";
//       }
//       if (existingCustomer.email === req.body.email) {
//         field = "email";
//       }
//       if (existingCustomer.pwd === req.body.pwd) {
//         field = "pwd";
//       }
//       if (existingCustomer.date_of_birth === req.body.date_of_birth) {
//         field = "pwd";
//       } else {
//         console.log("toto");
//       }
//     }
//   }

//   const savedPost = await shopping_cartDataMapper.modifyOneCustomer(req.params.id, req.body);
//   return res.json(savedPost);

// };


//********************************************************* */ DELETE SHOPPING_CART
const deleteOneShopping_Cart = async (req, res) => {
  const customerId = req.params.id;
  const result = await shopping_cartDataMapper.deleteOneShopping_CartDataMapper(customerId);
  console.log("a shopping_cart was deleted");
  res.status(200).json(result);
};


module.exports = { createNewShopping_cart, fetchOneShopping_cart, deleteOneShopping_Cart };