const express = require('express')
// const { getallorder } = require('../../controllers/order-controller/order-controller')
const { createOrder } = require('../../controllers/order-controller/order-controller')
const { getorderById } = require('../../controllers/order-controller/order-controller')
const  authticate  = require('../../middlewares/authticate')

const orderRoute = express.Router()

// orderRoute.get('/', getallorder )
orderRoute.get('/', authticate,getorderById)
orderRoute.post('/', createOrder)



module.exports = orderRoute