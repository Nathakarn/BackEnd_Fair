const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

const searchProduct = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const searchCategory = async (req, res, next) => {
  try {
    const { category } = req.query;

    if (!category) {
      customError("Please enter category", 400);
    }

    const searchResult = await prisma.product.findMany({
      where: {
        category: category,
      },
    });

    res.status(200).json(searchResult);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchProduct,
  searchCategory,
};
