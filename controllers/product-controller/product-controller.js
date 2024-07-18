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
  } = req.body;

  const { store_id } = req.params; // รับ store_id จาก params

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
      store_id: Number(store_id), // แปลง store_id เป็น number ถ้าจำเป็น
    },
  });

  res.json({ msg: "create Product done", result: rs });
});


//getAllProducts
module.exports.getAllProducts = tryCatch(async (req, res) => {
  const rs = await prisma.product.findMany();
  res.json(rs);
});

// module.exports.getProductsById = tryCatch(async (req, res) => {
//   const { product_id } = req.params;

//   const product = await prisma.product.findUnique({
//     where: {
//       product_id: Number(product_id), 
//     },
//   });

//   res.json(product);
// });

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

// getProductsByProductType
module.exports.getProductsByProductType = tryCatch(async (req, res) => {
  const { product_type } = req.params;

  // Validate that product_type is either 'Normal' or 'PreOrder'
  if (!['Normal', 'PreOrder'].includes(product_type)) {
    return res.status(400).json({ msg: 'Invalid product_type' });
  }

  const rs = await prisma.product.findMany({
    where: {
      product_type: product_type,
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
