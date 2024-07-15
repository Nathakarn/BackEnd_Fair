const express = require('express')
const { addtoCart } = require('../../controllers/cartitem-controller/cartitem-controller');


const cartItemRoute = express.Router()

cartItemRoute.post('/', addtoCart)



module.exports = cartItemRoute