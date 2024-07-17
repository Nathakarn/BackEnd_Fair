const productRoute = require("../../routes/product-route/product-route");
const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

module.exports.createProduct = tryCatch(async (req, res, next) => {
  const {
    product_title,
    description,
    price,
    real_price,
    category,
    product_pic,
    product_video,
    product_type,
    store_id,
  } = req.body;

  // validation
  const rs = await prisma.product.create({
    data: {
      product_title,
      description,
      price,
      real_price,
      category,
      product_pic,
      product_video,
      product_type,
      store_id,
    },
  });

  res.json({ msg: "create Product done", result: rs });
});

//getAllProducts
module.exports.getAllProducts = tryCatch(async (req, res) => {
  const rs = await prisma.product.findMany();
  res.json(rs);
});

module.exports.getProductsByStoreId = tryCatch(async (req, res) => {
  const { store_id } = req.params;

  const products = await prisma.product.findMany({
    where: {
      store_id: Number(store_id), // Ensure store_id is correctly passed and converted to number
    },
  });

  res.json(products);
});

module.exports.updateProduct = tryCatch(async (req, res) => {
  const { id } = req.params;
  const {
    product_title,
    description,
    price,
    real_price,
    category,
    product_pic,
    product_video,
    product_type,
    store_id,
  } = req.body;

  const rs = await prisma.product.update({
    where: { product_id: Number(id) },
    data: {
      product_title,
      description,
      price,
      real_price,
      category,
      product_pic,
      product_video,
      product_type,
      store_id,
    },
  });
  res.json(rs);
});

module.exports.deleteProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  try {
    const rs = await prisma.product.delete({
      where: { product_id: Number(id) }
    });
    res.json({ msg: 'product deleted successfully', result: rs });
  } catch (error) {
    console.error('Error deleting product', error);
    next(error);
  }
});

// getProductsByPriceDesc
module.exports.getProductsByPriceDesc = tryCatch(async (req, res) => {
  const rs = await prisma.product.findMany({
    orderBy: {
      price: "desc",
    },
  });
  res.json(rs);
});

// getProductsByCategory
module.exports.getProductsByCategory = tryCatch(async (req, res) => {
  const { category } = req.params;
  const rs = await prisma.product.findMany({
    where: {
      category: category,
    },
  });
  res.json(rs);
});

// getuserid
module.exports.getUser = tryCatch(async (req, res) => {
  const { store_id } = req.params;

  const user_id = await prisma.store.findUnique({
    where: { store_id: Number(store_id) },
    select: { user_id: true },
  });

  if (!user_id) {
    return res.status(404).json({ msg: "user_id not found" });
  }
  res.json(user_id);
});
