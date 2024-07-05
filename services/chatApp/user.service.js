const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

const findUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  if (!user) {
    throw customError("User not found.", 400);
  }
  return user;
};

module.exports = {
  findUser,
};
