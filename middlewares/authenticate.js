const jwt = require("jsonwebtoken");
const prisma = require("../models");
const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");
require("dotenv").config();

module.exports = tryCatch(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw customError("Unauthorized", 401);
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    throw customError("Unauthorized", 401);
  }
  const { user_id, username } = jwt.verify(token, process.env.JWT_SECRET);
  const rs = { user_id, username };
  const user = await prisma.user.findUnique({ where: { user_id: user_id } });
  delete user.password;

  req.user = user;
  // console.log("rs = ", rs);
  next();
});
