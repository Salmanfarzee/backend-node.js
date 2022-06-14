const jwt = require("jsonwebtoken");
const secretKey = "salman";

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token" });
  }

  return jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.user = decoded;
    return next();
  });
};
const auth = { verifyToken };
module.exports = auth;
