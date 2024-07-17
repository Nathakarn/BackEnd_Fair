const customError = require("../../utils/customError")
const tryCatch = require("../../utils/tryCatch")
const prisma = require("../../models");


module.exports.getorderById = tryCatch(async (req, res) => {
    const rs = await prisma.order.findMany({
        where: { user_id: req.user.user_id },
        include: { product: true }
    })
    res.json(rs)
});


module.exports.createOrder = tryCatch(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
  
    const quantityNumber = parseInt(quantity, 10);
    if (isNaN(quantityNumber)) {
      return res.status(400).json({ error: "Quantity should be a number" });
    }
  
    const existingOrder = await prisma.order.findFirst({
      where: { user_id: req.user.user_id, product_id: +id },
    });
  
    if (existingOrder) {
  
      const newQuantity = parseInt(existingOrder.quantity, 10) + quantityNumber;
  
      const updatedOrder = await prisma.order.update({
        where: { order_id: existingOrder.order_id },
        data: {
          quantity: newQuantity.toString(), 
        },
      });
      res.json(updatedOrder);
    } else {
      const newOrder = await prisma.order.create({
        data: {
          user_id: req.user.user_id,
          product_id: +id,
          quantity: quantityNumber.toString(),
        },
      });
      res.json(newOrder);
    }
  });

module.exports.deleteorderById = tryCatch(async (req, res) => {
    const { id } = req.params;
    const rs = await prisma.order.delete({
        where: { order_id: +id }
    })
    console.log(rs)

});



