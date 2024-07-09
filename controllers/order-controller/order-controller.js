const customError = require("../../utils/customError")
const tryCatch = require("../../utils/tryCatch")
const prisma = require("../../models");


module.exports.getallorder = tryCatch(async (req, res) => {
    const order = await prisma.order.findMany({
      where:{id : 1},
        include:{product : true}
    });
    console.log(order)
    if (order.length === 0) {
        throw customError("order not found.", 408);
    }

    res.status(206).json(order);
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

