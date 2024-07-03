const express = require('express')
const { createProduct } = require('../../controllers/product-controller/product-controller')

const productRoute = express.Router()

productRoute.post('/', createProduct)
productRoute.get('/', () =>{})


module.exports = productRoute