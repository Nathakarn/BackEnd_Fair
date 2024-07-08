const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

module.exports.createUser = tryCatch(async (req, res, next) => {
  const { name, email, picture, status, password } = req.body;

  const newUser = { name, email, picture, status, password };

  const user = await prisma.user.create({ data: newUser });

  if (!user) {
    throw customError(
      "error create users",
      400
    );
  }

  res.status(200).json({ user });
});
