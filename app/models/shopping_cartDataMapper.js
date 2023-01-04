//created_at,customer_id,product_id
const client = require("../config/db");




const shopping_cartDataMapper = {

  //********************************************************* */ CREATE SHOPPING_CART

  async createNewShopping_cartDataMapper(category){
    let { category_name } = category;
    console.log("**file_shopping_cartDatamapper*************category_name", category_name);
    const querySQL = {
      text: `INSERT INTO "shopping_cart" 
        ("category_name" )
        VALUES ($1)
        `,
      values: [category_name],
    };

    const result = await client.query(querySQL);
    console.log("new shopping_cart add into DB", result);
    return result.rowCount;
  },

  //********************************************************* */ //READ ONE SHOPPING_CART

  async fetchOneShopping_cartDataMapper(id){
    const query = {
      text: `SELECT * FROM shopping_cart
                WHERE "id" = $1;`,
      values: [id],
    };
    const results = await client.query(query);
    if(!results.rowCount){
      console.log("no data found");
    }
    return results.rows;
  },
  //********************************************************* */ UPDATE SHOPPING_CART

  // async modifyOneCustomer(id, customer) {
  //   const fields = Object.keys(customer).map((prop, index) => `"${prop}" = $${index + 1}`);
  //   const values = Object.values(customer);

  //   const savedCustomer = await client.query(
  //     `
  //           UPDATE customer SET
  //               ${fields}
  //           WHERE id = $${fields.length + 1}
  //           RETURNING *
  //       `,
  //     [...values, id],
  //   );

  //   return savedCustomer.rows[0];

  // },

  // async isUnique(inputData, customerId) {
  //   const fields = [];
  //   const values = [];
  //   // On récupère la liste des infos envoyés
  //   Object.entries(inputData).forEach(([key, value], index) => {
  //     // On ne garde que les infos qui sont censées être unique
  //     if (["family_name", "first_name", "address", "city", "zip_code", "phone", "email", "pwd", "date_of_birth" ].includes(key)) {
  //       // On génère le filtre avec ces infos
  //       fields.push(`"${key}" = $${index + 1}`);
  //       values.push(value);
  //     }
  //   });

  //   const preparedQuery = {
  //     text: `SELECT * FROM customer WHERE (${fields.join(" OR ")})`,
  //     values,
  //   };

  //   // Si l'id est fourni on exclu l'enregistrement qui lui correspond
  //   if (customerId) {
  //     preparedQuery.text += ` AND id <> $${values.length + 1}`;
  //     preparedQuery.values.push(customerId);
  //   }
  //   const result = await client.query(preparedQuery);

  //   if (result.rowCount === 0) {
  //     return null;
  //   }

  //   return result.rows[0];
  // },



  //********************************************************* */ DELETE ONE SHOPPING_CART
  async deleteOneShopping_CartDataMapper(id) {
    const query = {
      text: "DELETE FROM shopping_cart WHERE id = $1",
      values: [id],
    };

    await client.query(query);

    return "The shopping_cart has been deleted from database";
  },
};



module.exports = shopping_cartDataMapper;