const express = require('express')
// const { getallorder } = require('../../controllers/order-controller/order-controller')
const { createOrder, deleteorderById } = require('../../controllers/order-controller/order-controller')
const { getorderById } = require('../../controllers/order-controller/order-controller')


const orderRoute = express.Router()

// orderRoute.get('/', getallorder )
orderRoute.get('/', getorderById)
orderRoute.post('/:id', createOrder)
orderRoute.delete('/:id', deleteorderById )



module.exports = orderRoute