const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

const searchProduct = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    customError("Please enter keyword", 400);
  }

  const searchResult = await prisma.product.findMany({
    where: {
      product_title: {
        contains: keyword.toLowerCase(),
      },
    },
  });

  res.status(200).json(searchResult);
};

module.exports = {
  searchProduct,
};
