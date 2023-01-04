const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    next();

  } catch (error) {
    res.status(401).json({ error: "access is denied !" });
  }
};

module.exports = authentication;
