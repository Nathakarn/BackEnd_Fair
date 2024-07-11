const express = require('express')
const { getallorder } = require('../../controllers/order-controller/order-controller')
const { createOrder } = require('../../controllers/order-controller/order-controller')
const { getorderById } = require('../../controllers/order-controller/order-controller')

const orderRoute = express.Router()

orderRoute.get('/', getallorder )
orderRoute.get('/:id', getorderById)
orderRoute.post('/', createOrder)



module.exports = orderRoute