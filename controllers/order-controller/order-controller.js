const customError = require("../../utils/customError")
const tryCatch = require("../../utils/tryCatch")
const prisma = require("../../models");


module.exports.getorderById = tryCatch(async (req, res) => {
    const rs = await prisma.order.findMany({
        where: {user_id : req.user.user_id},
        include: {product:true}
    })
    res.json(rs)
});


module.exports.createOrder = tryCatch(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    console.log("create order", req.params);
    console.log("create quantity", req.body);
    console.log(req.user)
    await prisma.order.create({
        data: {
            user_id: req.user.user_id,
            product_id: +id,  
            quantity:+quantity.quantity
        }
    })

});


module.exports.deleteorderById = tryCatch(async (req, res) => {
    const {id } = req.params;
    const rs = await prisma.order.delete({
        where:{order_id : +id}
    })
    console.log(rs)

});



