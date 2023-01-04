
// IMPORTATION DE PG

const {Pool} = require("pg");

// CREATION NEW CLIENT
const client = new Pool (
  {
    connectionString: process.env.DATABASE_URL,
    ssl:{ rejectUnauthorized: false } // On accepte de se passer de SSL
  } // le SSL est indispensable pour la connexion avec Heroku (Secure Sockets Layer, protocole de sécurisation des échanges sur Internet, devenu Transport Layer Security en 2001)
);

client.connect();

module.exports = client;
