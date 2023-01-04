const categoryDataMapper = require("../models/categoryDatamapper");


const jwt = require("jsonwebtoken");
console.log("jwt", jwt);



//********************************************************* */ READ ALL CATEGORY
const fetchAllCategory = async (_, res) => {
  const category = await categoryDataMapper.getAllCategory();
  return res.status(200).json(category);
};

//********************************************************* */ READ ONE CATEGORY
const fetchOneCategory = async (req, res) => {
  const { id } = req.params;
  const oneCategory = await categoryDataMapper.fetchOneCategory(id);
  return res.status(200).json(oneCategory);
};

//********************************************************* */ CREATE CUSTOMER
const createNewCategory = async (req, res) => {
  const category = req.body;

  const result = await categoryDataMapper.createNewCategoryDataMapper(category);
  console.log("A new category was inserted into DB", result);

  return res.status(200).json(result);
};

//********************************************************* */ UPDATE CATEGORY

const modifyOneCategory = async (req, res) => {
  const category = await categoryDataMapper.fetchOneCategory(req.params.id);
  if (!category) {
    console.log("This category does not exists");
  }

  if (req.body.category_name) {
    const existingCategory = await categoryDataMapper.isUnique(req.body, req.params.id);
    if (existingCategory) {
      let field;
      if (existingCategory.category_name === req.body.category_name) {
        field = "category_name";
      }

    } else {
      console.log("category_name wrong");
    }
  }
  const savedPost = await categoryDataMapper.modifyOneCategory(req.params.id, req.body);
  return res.json(savedPost);

};
// DELETE ONE CATEGORY - 
const deleteOneCategory = async (req, res) => {
  const categoryId = req.params.id;
  const result = await categoryDataMapper.deleteOneCategory(categoryId);
  console.log("a category was deleted");
  return res.status(200).json(result);
};


module.exports = { fetchAllCategory, fetchOneCategory, createNewCategory, modifyOneCategory, deleteOneCategory };