const productRoute = require("../../routes/product-route/product-route");
const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

module.exports.createProduct = tryCatch(async (req, res, next) => {
  const { product_title,description,price,
    wholesaler_price,category,product_pic,product_video,product_type,store_id
  } = req.body;

  // validation
const rs = await prisma.product.create({
  data :{
    product_title,
    description,
    price,
    wholesaler_price,
    category,
    product_pic,
    product_video,
    product_type,
    store_id
  }
})

  res.json({ msg: "create Product done", result :rs });
});

module.exports.getProduct =tryCatch(async (req,res) =>{
  const rs = await prisma.product.findMany({
    // where :{ product_id: req.product.id}
  })
  res.json({products :rs})
})

module.exports.updateProduct = tryCatch( async (req,res) => {
  const {id} =req.params
  const { product_title,description,price,
    wholesaler_price,category,product_pic,product_video,product_type
  } = req.body;

  const rs = await prisma.product.update({
    where: { product_id: Number(id) },
    data :{
      product_title,
      description,
      price,
      wholesaler_price,
      category,
      product_pic,
      product_video,
      product_type,
      store_id
    }
  })
  res.json({result: rs})
})

module.exports.deleteProduct = tryCatch(async(req,res,next) =>{
  const {id} = req.params

  const rs = await prisma.product.delete({
    where: { product_id: Number(id) }  
  })
  res.json({result: rs})
})