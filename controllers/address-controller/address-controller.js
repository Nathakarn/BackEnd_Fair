const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
// const prisma = require("../../models");

module.exports.createAddress = tryCatch(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    throw customError("Address not found test", 404);
  }

  res.json({ msg: "create Product done" });
});
