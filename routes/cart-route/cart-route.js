const express = require('express')
const { getIdCart } = require('../../controllers/cart-controller/cart-controller');
const { deleteCartItem } = require('../../controllers/cart-controller/cart-controller');


const cartRoute = express.Router()

cartRoute.get('/:cart_id', getIdCart )
cartRoute.delete('/item/:product_id', deleteCartItem);



module.exports = cartRoute