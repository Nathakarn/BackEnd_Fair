const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

module.exports.addtoCart = tryCatch(async (req, res) => {
    const { product_id, cart_id, quantity } = req.body;

    console.log('Request body:', req.body);

    // Ensure req.user is defined
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    let cartExists = cart_id
        ? await prisma.cart.findUnique({
            where: { cart_id: Number(cart_id) }
        })
        : null;

    if (!cartExists) {
        cartExists = await prisma.cart.create({
            data: {
                user_id: req.user.id, // Using the authenticated user's ID
                order_id: null, // Adjust as necessary
                cartitem_id: null // Adjust as necessary
            }
        });
    }

    // Check if the product exists
    const productExists = await prisma.product.findUnique({
        where: { product_id: Number(product_id) }
    });

    if (!productExists) {
        return res.status(400).json({ error: "Product not found" });
    }

    // Create the cart item
    const rs = await prisma.cartItem.create({
        data: {
            product_id: Number(product_id),
            cart_id: cartExists.cart_id,
            quantity: Number(quantity),
        },
    });

    res.json({ cartItem: rs });
});
