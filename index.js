require("dotenv").config();

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Add rate limit policy
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(apiLimiter);
app.use(helmet());

const router = require("./app/routers");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


app.use("/api", router);
app.get("/", (req, res) => res.send("Welcome to e-F0F REST API !"));


// lancement du serveur
const PORT = process.env.PORT ?? 3500;
app.listen(PORT, () => {
  console.log(`\x1b[1;33m\u26a1Running server on : http://localhost:${PORT} \u26a1\x1b[0m`);
});