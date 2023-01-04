const productDataMapper = require("../models/productDataMapper");
require("dotenv").config();


//********************************************************* */ READ PRODUCTS
const fetchAllProducts = async (req, res) => {
  const products = await productDataMapper.fetchAllProducts();

  if(!products) {
    return res.status(404).json({error: "aucun produits trouvé"});
  }

  return res.status(200).json(products);
};

//********************************************************* */ READ ONE PRODUCT
const fetchOneProduct = async (req, res) => {
  const { id } = req.params;

  const oneProduct = await productDataMapper.fetchOneProduct(id);

  if(!oneProduct) {
    return res.status(404).json({error: `le produit avec l'id : ${id} n'a pas été trouvé`});
  }

  return res.status(200).json(oneProduct);
};

// //********************************************************* */ CREATE PRODUCT
const createNewProduct = async (req, res) => {
  const product = req.body;

  const { product_name, price_without_taxes, product_info, product_image, prod_category_name, review_id, category_id } = req.body;


  if (!product_name) {
    return res.status(400).json({error: "veuillez insérer un nom de produit" });
  }

  if ( !price_without_taxes || !product_info || !product_image || !prod_category_name || !review_id || !category_id) {
    return res.status(400).json({error: "il manque une ou plusieurs valeurs"});
  }

  const result = await productDataMapper.createNewProductDataMapper(product);
  console.log("A new product was inserted into DB", result);

  if (!result) {
    return res.status(400).json({error: "erreur l'ajout à échoué !"});
  }

  return res.status(201).json(result);

};

//********************************************************* */ UPDATE PRODUCT
const modifyOneProduct = async (req, res) => {
  const product = await productDataMapper.fetchOneProduct(req.params.id);
  if (!product) {
    console.log("This product does not exists");
  }

  if (req.body.product_name || req.body.price_without_taxes || req.body.product_info || req.body.product_image || req.body.prod_category_name || req.body.review_id || req.body.category_id || req.body.pwd) {
    const existingProduct = await productDataMapper.isUnique(req.body, req.params.id);
    if (existingProduct) {
      let field;
      if (existingProduct.product_name === req.body.product_name) {
        field = "product_name";
      }
      if (existingProduct.price_without_taxes === req.body.price_without_taxes) {
        field = "price_without_taxes";
      }
      if (existingProduct.product_info === req.body.product_info) {
        field = "product_info";
      }
      if (existingProduct.product_image === req.body.product_image) {
        field = "product_image";
      }
      if (existingProduct.prod_category_name === req.body.prod_category_name) {
        field = "prod_category_name";
      }
      if (existingProduct.review_id === req.body.review_id) {
        field = "review_id";
      }
      if (existingProduct.category_id === req.body.category_id) {
        field = "category_id";
      } else {
        console.log("toto");
      }
    }
  }

  const savedPost = await productDataMapper.modifyOneProduct(req.params.id, req.body);
  return res.json(savedPost);

};

//********************************************************* */ DELETE ONE PRODUCT
const deleteOneProduct = async (req, res) => {
  const productId = req.params.id;
  const result = await productDataMapper.deleteOneProduct(productId);
  console.log("a product was deleted");
  res.status(200).json(result);
};

//********************************************************* */ FETCH ALL PRODUCTS BY CATEGORIES

const fetchAllProductsFromCategory1 = async (req, res) => {

  const productsByCategory = await productDataMapper.fetchAllProductsByCategoryDataMapper1();

  if(!productsByCategory) {
    return res.status(404).json({error: "la categorie n'a pas été trouvé"});
  }

  return res.status(200).json(productsByCategory);

};

const fetchAllProductsFromCategory2 = async (req, res) => {

  const productsByCategory = await productDataMapper.fetchAllProductsByCategoryDataMapper2();

  if(!productsByCategory) {
    return res.status(404).json({error: "la categorie n'a pas été trouvé"});
  }

  return res.status(200).json(productsByCategory);

};

const fetchAllProductsFromCategory3 = async (req, res) => {

  const productsByCategory = await productDataMapper.fetchAllProductsByCategoryDataMapper3();

  if(!productsByCategory) {
    return res.status(404).json({error: "la categorie n'a pas été trouvé"});
  }

  return res.status(200).json(productsByCategory);

};


const fetchAllProductsFromCategory4 = async (req, res) => {

  const productsByCategory = await productDataMapper.fetchAllProductsByCategoryDataMapper4();

  if(!productsByCategory) {
    res.status(404).json({error: "la categorie n'a pas été trouvé"});
  }

  res.status(200).json(productsByCategory);

};



module.exports = { fetchAllProducts, fetchOneProduct, createNewProduct, deleteOneProduct, modifyOneProduct, fetchAllProductsFromCategory1, fetchAllProductsFromCategory2, fetchAllProductsFromCategory3, fetchAllProductsFromCategory4 };