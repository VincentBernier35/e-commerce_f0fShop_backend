const client = require("../config/db");

/* j'appelle Category => un tableau categories et chaque categories qui contient contient les produits en dehors de la table products
 //********************************************************* */ //READ ALL CATEGORY

const categoryDataMapper = {

  async getAllCategory() {
    const query = "SELECT id, category_name FROM category";
    const results = await client.query(query);
    if(!results.rowCount){
      console.log("no data found");
    }
    return results.rows;
  },

  //********************************************************* */ //READ ONE CATEGORY

  async fetchOneCategory(id){
    const query = {
      text: `SELECT * FROM category
              WHERE "id" = $1;`,
      values: [id],
    };
    const results = await client.query(query);
    if(!results.rowCount){
      console.log("no data found");
    }
    return results.rows;
  },

  //********************************************************* */ CREATE CATEGORY

  async createNewCategoryDataMapper(category){
    let { category_name } = category;

    const querySQL = {
      text: `INSERT INTO "category" 
        ("category_name" )
        VALUES ($1)
        `,
      values: [category_name],
    };

    const result = await client.query(querySQL);
    console.log("new category add into DB", result);
    return result.rowCount;
  },

  //********************************************************* */ UPDATE CATEGORY
  async modifyOneCategory(id, category) {
    const fields = Object.keys(category).map((prop, index) => `"${prop}" = $${index + 1}`);
    const values = Object.values(category);

    const savedCategory = await client.query(
      `
          UPDATE category SET
              ${fields}
          WHERE id = $${fields.length + 1}
          RETURNING *
      `,
      [...values, id],
    );

    return savedCategory.rows[0];

  },

  async isUnique(inputData, categoryId) {
    const fields = [];
    const values = [];
    // On récupère la liste des infos envoyés
    Object.entries(inputData).forEach(([key, value], index) => {
    // On ne garde que les infos qui sont censées être unique
      if (["categorie_name"].includes(key)) {
      // On génère le filtre avec ces infos
        fields.push(`"${key}" = $${index + 1}`);
        values.push(value);
      }
    });

    const preparedQuery = {
      text: `SELECT * FROM category WHERE (${fields.join(" OR ")})`,
      values,
    };

    // Si l'id est fourni on exclu l'enregistrement qui lui correspond
    if (categoryId) {
      preparedQuery.text += ` AND id <> $${values.length + 1}`;
      preparedQuery.values.push(categoryId);
    }
    const result = await client.query(preparedQuery);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  },

  //******** */ DELETE ONE CATEGORY
  async deleteOneCategory(id) {
    const query = {
      text: "DELETE FROM category WHERE id = $1",
      values: [id],
    };

    await client.query(query);

    return "The category has been deleted from database";
  },
};



module.exports = categoryDataMapper;