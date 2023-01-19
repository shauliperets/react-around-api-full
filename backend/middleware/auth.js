const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return response.status(403).send({ message: "Authorization Required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV);
  } catch (error) {
    return response.status(403).send({ message: "Authorization Required" });
  }

  request.user = payload;

  next();
};
