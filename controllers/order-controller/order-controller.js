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
    const productUser = await prisma.order.findMany({
        where: { user_id: req.user.user_id,product_id:+id }
    })
    if (productUser.length > 0) {
        const sum = (productUser[0].quantity + quantity)
        const rs = await prisma.order.updateMany({
            where: { product_id: +id },
            data: {
                quantity: sum
            }
        })
        res.json(rs)
    } else {
        const rs = await prisma.order.create({
            data: {
                user_id: req.user.user_id,
                product_id: +id,
                quantity: +quantity
            }
        })
        res.json(rs)
    }
});


module.exports.deleteorderById = tryCatch(async (req, res) => {
    const { id } = req.params;
    const rs = await prisma.order.delete({
        where: { order_id: +id }
    })
    console.log(rs)

});



