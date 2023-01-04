const client = require("../config/db");

const productDataMapper = {
  //********************************************************* */ READ PRODUCTS
  async fetchAllProducts() {
    const query = "SELECT id, product_name, price_without_taxes, product_info, product_image, prod_category_name, review_id, category_id FROM product";
    const results = await client.query(query);

    if(!results.rowCount){
      console.log("no data found");
      return null;
    }
    return results.rows;
  },

  //********************************************************* */ READ ONE PRODUCT
  async fetchOneProduct(id){
    const query = {
      text: `SELECT * FROM product
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

  //********************************************************* */ CREATE PRODUCT

  async createNewProductDataMapper(product){
    let { product_name, price_without_taxes, product_info, product_image, prod_category_name, review_id, category_id } = product;

    const querySQL = {
      text: `INSERT INTO "product" 
        ("product_name", "price_without_taxes", "product_info", "product_image", "prod_category_name", "review_id", "category_id" )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
      values: [ product_name, price_without_taxes, product_info, product_image, prod_category_name, review_id, category_id ],
    };

    const result = await client.query(querySQL);
    console.log("new product add into DB", result);
    return result.rowCount;
  },

  //********************************************************* */ UPDATE PRODUCT
  async modifyOneProduct(id, product) {
    const fields = Object.keys(product).map((prop, index) => `"${prop}" = $${index + 1}`);
    const values = Object.values(product);

    const savedProduct = await client.query(
      `
            UPDATE product SET
                ${fields}
            WHERE id = $${fields.length + 1}
            RETURNING *
        `,
      [...values, id],
    );

    return savedProduct.rows[0];
  },

  async isUnique(inputData, productId) {
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
      text: `SELECT * FROM product WHERE (${fields.join(" OR ")})`,
      values,
    };

    // Si l'id est fourni on exclu l'enregistrement qui lui correspond
    if (productId) {
      preparedQuery.text += ` AND id <> $${values.length + 1}`;
      preparedQuery.values.push(productId);
    }
    const result = await client.query(preparedQuery);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  },

  //********************************************************* */ DELETE ONE PRODUCT
  async deleteOneProduct(id) {
    const query = {
      text: "DELETE FROM product WHERE id = $1",
      values: [id],
    };

    await client.query(query);

    return "The product has been deleted from database";
  },

  //********************************************************* */ fetchAllProductsByCategoriesDataMapper

  async fetchAllProductsByCategoryDataMapper1(){
    const query = {
      text: `SELECT * FROM product
              WHERE category_id = 1;`
    };

    const results = await client.query(query);

    if(!results.rowCount){
      console.log("no data found");
      return null;
    }

    return results.rows;
  },

  async fetchAllProductsByCategoryDataMapper2(){
    const query = {
      text: `SELECT * FROM product
              WHERE category_id = 2;`
    };

    const results = await client.query(query);

    if(!results.rowCount){
      console.log("no data found");
      return null;
    }

    return results.rows;
  },

  async fetchAllProductsByCategoryDataMapper3(){
    const query = {
      text: `SELECT * FROM product
              WHERE category_id = 3;`
    };

    const results = await client.query(query);

    if(!results.rowCount){
      console.log("no data found");
      return null;
    }

    return results.rows;
  },

  async fetchAllProductsByCategoryDataMapper4(){
    const query = {
      text: `SELECT * FROM product
              WHERE category_id = 4;`
    };

    const results = await client.query(query);

    if(!results.rowCount){
      console.log("no data found");
      return null;
    }

    return results.rows;
  }



};

module.exports = productDataMapper;