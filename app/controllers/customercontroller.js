const customerDataMapper = require("../models/customerDataMapper");

require("dotenv").config();

const jwt = require("jsonwebtoken");

//********************** */ READ CUSTOMERS
const fetchAllCustomers = async (req, res) => {
  const customers = await customerDataMapper.getAllCustomer();

  if(!customers) {
    return res.status(404).json({error: "aucun utilisateurs trouvé"});
  }

  return res.status(200).json(customers);
};

//***************** */ READ ONE CUSTOMER
const fetchOneCustomer = async (req, res) => {
  const { id } = req.params;

  const oneCustomer = await customerDataMapper.fetchOneCustomer(id);

  if(!oneCustomer) {
    return res.status(404).json({error: `l'utilisateur avec l'id : ${id} n'a pas été trouvé`});
  }

  return res.status(200).json(oneCustomer);
};

// //********************* */ CREATE CUSTOMER (route signup)
const createNewCustomer = async (req, res) => {
  const { email, family_name, first_name, pwd } = req.body;

  const emailRegex = process.env.EMAIL_REGEX;

  if (!email) {
    return res.status(400).json({error: "veuillez insérer un email" });
  }if (!email.match(emailRegex)) {
    return res.status(400).json({error: "l'email n'est pas valide" });
  }
  if ( !family_name || !first_name || !pwd ) {
    return res.status(400).json({error: "il manque une ou plusieurs clées"});
  }

  const result = await customerDataMapper.createNewCustomerDataMapper(req.body);

  if (!result) {
    return res.status(400).json({error: "adresse email non disponible !"});
  }

  return res.status(201).json({message: "le signup est réussi"});
};

//************** */ UPDATE CUSTOMER
const modifyOneCustomer = async (req, res) => {
  const customer = await customerDataMapper.fetchOneCustomer(req.params.id);
  if (!customer) {
    console.log("This customer does not exists");
  }

  if (req.body.family_name || req.body.first_name || req.body.address || req.body.city || req.body.zip_code || req.body.phone || req.body.email || req.body.pwd) {
    const existingCustomer = await customerDataMapper.isUnique(req.body, req.params.id);
    if (existingCustomer) {
      let field;
      if (existingCustomer.family_name === req.body.family_name) {
        field = "family_name";
      }
      if (existingCustomer.first_name === req.body.first_name) {
        field = "first_name";
      }
      if (existingCustomer.address === req.body.address) {
        field = "address";
      }
      if (existingCustomer.city === req.body.city) {
        field = "city";
      }
      if (existingCustomer.zip_code === req.body.zip_code) {
        field = "zip_code";
      }
      if (existingCustomer.phone === req.body.phone) {
        field = "phone";
      }
      if (existingCustomer.email === req.body.email) {
        field = "email";
      }
      if (existingCustomer.pwd === req.body.pwd) {
        field = "pwd";
      }
      if (existingCustomer.date_of_birth === req.body.date_of_birth) {
        field = "pwd";
      } else {
        console.log("toto");
      }
    }
  }

  const savedPost = await customerDataMapper.modifyOneCustomer(req.params.id, req.body);
  return res.json(savedPost);

};

//******************** */ DELETE ONE CUSTOMER
const deleteOneCustomer = async (req, res) => {
  const customerId = req.params.id;
  console.log("coucou from customer");
  const result = await customerDataMapper.deleteOneCustomer(customerId);
  console.log("a customer was deleted");
  res.status(200).json(result);
};

//******* */ signInUser (= login d'un customer qui est déja inscrit) ************
const signInUser = async (req, res) => {

  const { email, pwd } = req.body;

  if (!email || !pwd) {
    return res.status(401).json({ error: "Email ou password manquant"});
  }

  const customer = await customerDataMapper.fetchOneCustomerByEmail(email, pwd);

  if (!customer) {
    return res.status(401).json({ error: "L'email ou le mot de passe ne correspondent pas"});
  }

  const user = customer[0];

  const accessToken = jwt.sign({
    email: user.email
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });

  const returnedObject = {
    ...user,
    accessToken,
  };

  return res.status(200).json(returnedObject);
};



//********************************************************* */ signOutUser
const signOutUser = (req, res) => {

  console.log("hello from signout controller");
  if(!req.session.customer){
    console.log("You are not logged.");
  }
  delete req.session.customer;
  res.status(200).json("You have successfuly logged out.");
};


module.exports = { fetchAllCustomers, fetchOneCustomer, createNewCustomer, deleteOneCustomer, modifyOneCustomer, signOutUser, signInUser };