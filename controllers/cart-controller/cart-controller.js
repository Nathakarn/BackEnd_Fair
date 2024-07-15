// const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");


module.exports.getIdCart = tryCatch(async (req, res) => {
    const { cart_id } = req.params;
    const rs = await prisma.cart.findUnique({
        where: { cart_id: Number(cart_id) },
        include: {
            cartitem: {
                include: {
                    product: true
                }
            }
        }
    });
    res.json({ cart: rs });
});



module.exports.deleteCartItem = tryCatch(async (req, res) => {
    const { product_id } = req.params;

    try {
        // Delete cart item by product_id
        await prisma.cartItem.delete({
            where: {
                product_id: Number(product_id)
            }
        });

        res.json({ message: "Cart item deleted successfully." });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});





