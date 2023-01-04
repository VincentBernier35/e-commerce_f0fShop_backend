const client = require("../config/db");

const reviewDataMapper = {
  //************************************* */ READ REVIEW
  async getAllReview() {
    const query = "SELECT id, review, first_name,customer_id FROM review";
    const results = await client.query(query);
    if(!results.rowCount){
      console.log("no data found");
    }
    return results.rows;
  },
  //********************************************************* */ READ ONE review
  async fetchOneReview(id){
    const query = {
      text: `SELECT * FROM review
              WHERE "id" = $1;`,
      values: [id],
    };
    const results = await client.query(query);
    if(!results.rowCount){
      console.log("no data found");
    }
    return results.rows;
  },


  //******************************** */ CREATE REVIEW

  async createNewReviewDataMapper(reviews){
    let { review, first_name, customer_id} = reviews;

    console.log("**file_reviewDatamapper***********review", reviews);
    const querySQL = {
      text: `INSERT INTO "review" 
        ("review", "first_name", "customer_id")
        VALUES ($1, $2, $3)
        `,
      values: [review, first_name, customer_id ],/// review
    };
    const result = await client.query(querySQL);
    console.log("new review add into DB", result);
    return result.rowCount;
  },

  //********************************************************* */ UPDATE REVIEW

  async modifyOneReview(id, review) {
    const fields = Object.keys(review).map((prop, index) => `"${prop}" = $${index + 1}`);
    const values = Object.values(review);

    const savedReview = await client.query(
      `
            UPDATE review SET
                ${fields}
            WHERE id = $${fields.length + 1}
            RETURNING *
        `,
      [...values, id],
    );
    return savedReview.rows[0];
  },

  async isUnique(inputData, reviewId) {
    const fields = [];
    const values = [];
    // On récupère la liste des infos envoyés
    Object.entries(inputData).forEach(([key, value], index) => {
      // On ne garde que les infos qui sont censées être unique
      if (["review", "first_name", "customer_id" ].includes(key)) {
        // On génère le filtre avec ces infos
        fields.push(`"${key}" = $${index + 1}`);
        values.push(value);
      }
    });

    const preparedQuery = {
      text: `SELECT * FROM review WHERE (${fields.join(" OR ")})`,
      values,
    };

    // Si l'id est fourni on exclu l'enregistrement qui lui correspond
    if (reviewId) {
      preparedQuery.text += ` AND id <> $${values.length + 1}`;
      preparedQuery.values.push(reviewId);
    }
    const result = await client.query(preparedQuery);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  },
  //********************************************************* */ DELETE ONE REVIEW
  async deleteOneReview(id) {
    const query = {
      text: "DELETE FROM review WHERE id = $1",
      values: [id],
    };

    await client.query(query);

    return "The review has been deleted from database";
  },

  //********************************************************* */

};

module.exports = reviewDataMapper;