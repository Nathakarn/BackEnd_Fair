// const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");


module.exports.addtoCart = tryCatch(async (req, res) => {
    const { product_id, cart_id } = req.body;

 

    console.log('Request body:', req.body);
    const rs = await prisma.cartItem.create({
        data: {
            product_id: Number(product_id),
            cart_id: Number(cart_id),
        },
    });

    res.json({ cartItem: rs });



});
