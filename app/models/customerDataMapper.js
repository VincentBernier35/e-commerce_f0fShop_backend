const client = require("../config/db");
const bcrypt = require("bcrypt");

const customerDataMapper = {
  //*********************** */ READ CUSTOMERS
  async getAllCustomer() {
    const query = "SELECT id, family_name, first_name, address, city, zip_code, phone, email, date_of_birth FROM customer";
    const results = await client.query(query);

    if(!results.rowCount){
      console.log("no data found");
      return null;
    }

    return results.rows;
  },
  //***************************** */ READ ONE CUSTOMER
  async fetchOneCustomer(id){
    const query = {
      text: `SELECT * FROM customer
              WHERE "id" = $1;`,
      values: [id],
    };

    const results = await client.query(query);

    if(!results.rowCount){
      console.log("no data found");
      return null;
    }

    return results.rows;
  },


  //*************** */ READ ONE CUSTOMER BY EMAIL FOR SIGNIN
  async fetchOneCustomerByEmail(email, password){

    const userQuery = {
      text: `SELECT family_name, first_name, address, city, zip_code, phone, email, date_of_birth FROM customer
                WHERE "email" = $1;`,
      values: [email],
    };
    const user = await client.query(userQuery);


    if (user.rows.length === 0) {
      return null;
    }

    const userPasswordQuery = {
      text: `SELECT pwd FROM customer
                WHERE "email" = $1;`,
      values: [email],
    };
    const userPassword = await client.query(userPasswordQuery);

    if (userPassword.rows.length === 0) {
      return null;
    }

    const comparedPassword = await bcrypt.compare(password, userPassword.rows[0].pwd); // comparedPassword est un booléen

    if (comparedPassword && user) {
      return user.rows;
    }

    return null;
  },

  //******************* */ CREATE CUSTOMER
  async createNewCustomerDataMapper(body){

    const { email, family_name, first_name, date_of_birth, phone, address, zip_code, city, pwd: passwordCustomer} = body;

    const userQuery = {
      text: `SELECT family_name, first_name, address, city, zip_code, phone, email, date_of_birth FROM customer
                WHERE "email" = $1;`,
      values: [email],
    };
    const user = await client.query(userQuery);

    if (user.rowCount) {
      return null;
    }

    const salt = await bcrypt.genSalt();
    const pwd = await bcrypt.hash(passwordCustomer, salt);

    const querySQL = {
      text: `INSERT INTO "customer" 
        ("email", "family_name", "first_name", "date_of_birth", "phone", "address", "zip_code", "city", "pwd")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `,
      values: [email, family_name, first_name, date_of_birth, phone, address, zip_code, city, pwd ],
    };
    const result = await client.query(querySQL);

    console.log("new customer add into DB", result);
    return result.rowCount;
  },



  //************ */ UPDATE CUSTOMER
  async modifyOneCustomer(id, customer) {
    const fields = Object.keys(customer).map((prop, index) => `"${prop}" = $${index + 1}`);
    const values = Object.values(customer);

    const savedCustomer = await client.query(
      `
            UPDATE customer SET
                ${fields}
            WHERE id = $${fields.length + 1}
            RETURNING *
        `,
      [...values, id],
    );

    return savedCustomer.rows[0];

  },

  async isUnique(inputData, customerId) {
    const fields = [];
    const values = [];
    // On récupère la liste des infos envoyés
    Object.entries(inputData).forEach(([key, value], index) => {
      // On ne garde que les infos qui sont censées être unique
      if (["family_name", "first_name", "address", "city", "zip_code", "phone", "email", "pwd", "date_of_birth" ].includes(key)) {
        // On génère le filtre avec ces infos
        fields.push(`"${key}" = $${index + 1}`);
        values.push(value);
      }
    });

    const preparedQuery = {
      text: `SELECT * FROM customer WHERE (${fields.join(" OR ")})`,
      values,
    };

    // Si l'id est fourni on exclu l'enregistrement qui lui correspond
    if (customerId) {
      preparedQuery.text += ` AND id <> $${values.length + 1}`;
      preparedQuery.values.push(customerId);
    }
    const result = await client.query(preparedQuery);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  },
  //*************** */ DELETE ONE CUSTOMER
  async deleteOneCustomer(id) {
    const query = {
      text: "DELETE FROM customer WHERE id = $1",
      values: [id],
    };
    console.log("!!!!coucou!!!", id);
    await client.query(query);

    return "The customer has been deleted from database";
  },

  //********************************************************* */ D...

};

module.exports = customerDataMapper;