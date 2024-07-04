const productRoute = require("../../routes/product-route/product-route");
const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

module.exports.createProduct = tryCatch(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    throw customError("name not found", 400);
  }

  res.json({ msg: "create Product done" });
});
