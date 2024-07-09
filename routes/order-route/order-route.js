const express = require('express')
const { getallorder } = require('../../controllers/order-controller/order-controller')
const { createOrder } = require('../../controllers/order-controller/order-controller')

const orderRoute = express.Router()

orderRoute.get('/', getallorder )
orderRoute.post('/', createOrder)



module.exports = orderRoute