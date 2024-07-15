const customError = require("../../utils/customError")
const tryCatch = require("../../utils/tryCatch")
const prisma = require("../../models");



module.exports.getallorder = tryCatch(async (req, res) => {
    const rs = await prisma.order.findMany();
    res.json({ order: rs });

});


// module.exports.getorderById = tryCatch(async (req, res) => {
//     const order = await prisma.order.findMany({
//         where: { order_id: 1 },
//         include: { product: true }
//     });
//     console.log(order)
//     if (order.length === 0) {
//         throw customError("order not found.", 408);
//     }

//     res.status(206).json(order);
// });


module.exports.getorderById = tryCatch(async (req, res) => {
    const rs = await prisma.order.findMany({
        where: { user_id: req.user.user_id },
        include: {}
    });
    if (!rs) {
        return res.status(404).json({ msg: "Order not found" });
    }
    res.json({ order: rs });
    console.log(req.user.user_id)
});

module.exports.createOrder = tryCatch(async (req, res) => {
    const { payment_method } = req.body;
    console.log(req.body);

    try {
        await prisma.order.create({
            data: {
                payment_method
            }
        });
        res.json('create ok');
    } catch (error) {
        console.error(error);
        res.status(409).json({ message: "Error creating order" });
    }
});

